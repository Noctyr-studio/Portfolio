
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
}


// 🪙 create JWT FUNCTION

const encoder = new TextEncoder()

function base64UrlEncode(input: string | object) {
  const json = typeof input === "string" ? input : JSON.stringify(input)

  return btoa(json)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

async function createJWT(payload: any, secret: string) {
  const header = {
    alg: "HS256",
    typ: "JWT",
  }

  const encodedHeader = base64UrlEncode(header)
  const encodedPayload = base64UrlEncode(payload)

  const data = `${encodedHeader}.${encodedPayload}`

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data)
  )

  const sigBase64 = btoa(
    String.fromCharCode(...new Uint8Array(signature))
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")

  return `${data}.${sigBase64}`
}



// 🪙 verify JWT FUNCTION

async function verifyJWT(token: string, secret: string) {
  if (!token) return null

  const parts = token.split(".")
  if (parts.length !== 3) return null

  const [header, payload, signature] = parts

  const data = `${header}.${payload}`

  const encoder = new TextEncoder()

  // 🔐 import key
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  )

  // 🔧 base64url → bytes (FIX IMPORTANTE)
  function base64UrlToBytes(str: string) {
    str = str.replace(/-/g, "+").replace(/_/g, "/")

    const pad = str.length % 4
    if (pad) str += "=".repeat(4 - pad)

    return Uint8Array.from(atob(str), (c) => c.charCodeAt(0))
  }

  const sigBytes = base64UrlToBytes(signature)

  // 🔍 verify signature
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    sigBytes,
    encoder.encode(data)
  )

  if (!valid) return null

  // 🔓 decode payload safely
  function base64UrlDecode(str: string) {
    str = str.replace(/-/g, "+").replace(/_/g, "/")

    const pad = str.length % 4
    if (pad) str += "=".repeat(4 - pad)

    return JSON.parse(atob(str))
  }

  return base64UrlDecode(payload)
}


// 🔐 HASH PASSWORD FUNCTION
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)

  const hashBuffer = await crypto.subtle.digest("SHA-256", data)

  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("")
}




export default {
  async fetch(request: Request, env: any): Promise<Response> {
  const url = new URL(request.url)

  // CORS PREFLIGHT
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    })
  }

    // 👉 REGISTER
    if (url.pathname === "/register" && request.method === "POST") {
      const body = (await request.json()) as { email: string; password: string }

      // 🔐 HASH PASSWORD
      const hashedPassword = await hashPassword(body.password)

      try {
        await env.noctyr_db
          .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
          .bind(body.email, hashedPassword)
          .run()

        return new Response(JSON.stringify({ success: true }), {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        })
      } catch (e) {
          console.error("REGISTER ERROR:", e)

          const message = String(e)

          if (message.includes("UNIQUE constraint failed")) {
            return new Response(
              JSON.stringify({
                error: "User already exists"
              }),
              {
                status: 409,
                headers: {
                  "Content-Type": "application/json",
                  ...corsHeaders,
                },
              }
            )
          }

          return new Response(
            JSON.stringify({
              error: message
            }),
            {
              status: 500,
              headers: {
                "Content-Type": "application/json",
                ...corsHeaders,
              },
            }
          )
        }
    }

    // 👉 LOGIN
    if (url.pathname === "/login" && request.method === "POST") {
      const body = (await request.json()) as { email: string; password: string }

      const hashedPassword = await hashPassword(body.password)

      const user = await env.noctyr_db
        .prepare("SELECT * FROM users WHERE email = ? AND password = ?")
        .bind(body.email, hashedPassword)
        .first()
        console.log("USER FOUND:", body.email)
        console.log("JWT_SECRET:", env.JWT_SECRET)
      
   
      if (user) {
        try {
          const token = await createJWT(
          { email: body.email },
          env.JWT_SECRET
        )
        
        return new Response(
          JSON.stringify({
            success: true,
            token,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        )
        } catch (e) {
          console.error("JWT ERROR:", e)

          return new Response(
            JSON.stringify({
              success: false,
              error: String(e)
            }),
            {
              status: 500,
              headers: {
                "Content-Type": "application/json",
                ...corsHeaders,
              },
            }
          )
        }
      }
    
      return new Response(JSON.stringify({ success: false }), {
        status: 401,       headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      })
    }

    // 🙂 WHO AM I ?
    if (url.pathname === "/me" && request.method === "GET") {
     const auth = request.headers.get("Authorization")

      if (!auth || !auth.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "No token" }), {
          status: 401,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        })
      }

      const token = auth.replace("Bearer ", "")

      const payload = await verifyJWT(token, env.JWT_SECRET)

      if (!payload) {
        return new Response(JSON.stringify({ error: "Invalid token" }), {
          status: 401,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        })
      }

      return new Response(
        JSON.stringify({         email: payload.email,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      )
    }
    // 👉 ESTE ES EL QUE TE FALTA
    return new Response("Hello API 🚀", {
      headers: corsHeaders,
    })
  },
}