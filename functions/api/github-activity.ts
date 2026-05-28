

export async function onRequest(context: {
  env: { GITHUB_TOKEN: string };
}) {
  const GITHUB_USERNAME = "Noctyr-studio";

  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - 365);

  const query = `
    query($userName: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $userName) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${context.env.GITHUB_TOKEN}`,
      "User-Agent": "portfolio",
    },
    body: JSON.stringify({
      query,
      variables: {
        userName: GITHUB_USERNAME,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
  });

  const json = await res.json();

  if (!res.ok) {
  return new Response(
    JSON.stringify({ error: "GitHub request failed" }),
    { status: res.status }
  );
  }

  if (json.errors) {
    return new Response(
      JSON.stringify({
        error: "GitHub GraphQL error",
        details: json.errors,
      }),
      { status: 500 }
    );
  }

  const weeks =
    json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

  if (!weeks || !Array.isArray(weeks)) {
    return new Response(
      JSON.stringify({ error: "No contribution data" }),
      { status: 500 }
    );
  }

  // 🔥 flatten → [{ date, count }]
  type Day = { date: string; contributionCount: number };

  const days = weeks.flatMap((w: { contributionDays: Day[] }) =>
    w.contributionDays.map((d) => ({
      date: d.date,
      count: d.contributionCount,
    }))
  );

  return new Response(JSON.stringify(days), {
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=21600, s-maxage=21600",
  },
});
}
