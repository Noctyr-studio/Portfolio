
import yoImg from "../assets/yo.jpeg";

export default function Hero() {
  return (
    <section
        style={{
            background: `
            radial-gradient(1200px 600px at 10% -10%, rgba(139,92,246,.25), transparent 60%),
            radial-gradient(1000px 500px at 110% 10%, rgba(97,246,92,.25), transparent 60%),
            linear-gradient(180deg,#0a0a0a 0%,#0b0b0b 100%)
            `
        }}
        >
      <div id="Home" className="mx-auto max-w-6xl px-4 py-16 sm:py-20 md:py-28">
        
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_.8fr]">
          
          {/* TEXTO */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
              Hi, I'm {" "}
              <span className="bg-gradient-to-br from-green-500 via-violet-600 to-orange-500 bg-clip-text text-transparent">
                Matías
              </span>
            </h1>
            <br />
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              <strong>Fullstack JavaScript Developer | Product-Focused</strong>
              <br /><br />
              I create interactive experiences and products where design, UX, and logic work together. 
              I focus on building systems that not only work, but also feel good to use.
            </p>
            
            {/* ICONOS */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-10">
              
              {/* GitHub */}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-gray-400 hover:scale-110 hover:shadow-lg hover:shadow-gray-400/40">
                <a href="https://github.com/Noctyr-studio" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                </a>
              </div>

              {/* itch.io */}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-fuchsia-700 hover:scale-110 hover:shadow-lg hover:shadow-fuchsia-400/40">
                <a href="https://noctyr-studio.itch.io/" target="_blank" rel="noopener noreferrer" className="text-fuchsia-700 hover:text-white">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 245.371 220.736">
                    <path d="M31.99 1.365C21.287 7.72.2 31.945 0 38.298v10.516C0 62.144 12.46 73.86 23.773 73.86c13.584 0 24.902-11.258 24.903-24.62 0 13.362 10.93 24.62 24.515 24.62 13.586 0 24.165-11.258 24.165-24.62 0 13.362 11.622 24.62 25.207 24.62h.246c13.586 0 25.208-11.258 25.208-24.62 0 13.362 10.58 24.62 24.164 24.62 13.585 0 24.515-11.258 24.515-24.62 0 13.362 11.32 24.62 24.903 24.62 11.313 0 23.773-11.714 23.773-25.046V38.298c-.2-6.354-21.287-30.58-31.988-36.933C180.118.197 157.056-.005 122.685 0c-34.37.003-81.228.54-90.697 1.365zm65.194 66.217a28.025 28.025 0 0 1-4.78 6.155c-5.128 5.014-12.157 8.122-19.906 8.122a28.482 28.482 0 0 1-19.948-8.126c-1.858-1.82-3.27-3.766-4.563-6.032l-.006.004c-1.292 2.27-3.092 4.215-4.954 6.037a28.5 28.5 0 0 1-19.948 8.12c-.934 0-1.906-.258-2.692-.528-1.092 11.372-1.553 22.24-1.716 30.164l-.002.045c-.02 4.024-.04 7.333-.06 11.93.21 23.86-2.363 77.334 10.52 90.473 19.964 4.655 56.7 6.775 93.555 6.788h.006c36.854-.013 73.59-2.133 93.554-6.788 12.883-13.14 10.31-66.614 10.52-90.474-.022-4.596-.04-7.905-.06-11.93l-.003-.045c-.162-7.926-.623-18.793-1.715-30.165-.786.27-1.757.528-2.692.528a28.5 28.5 0 0 1-19.948-8.12c-1.862-1.822-3.662-3.766-4.955-6.037l-.006-.004c-1.294 2.266-2.705 4.213-4.563 6.032a28.48 28.48 0 0 1-19.947 8.125c-7.748 0-14.778-3.11-19.906-8.123a28.025 28.025 0 0 1-4.78-6.155 27.99 27.99 0 0 1-4.736 6.155 28.49 28.49 0 0 1-19.95 8.124c-.27 0-.54-.012-.81-.02h-.007c-.27.008-.54.02-.813.02a28.49 28.49 0 0 1-19.95-8.123 27.992 27.992 0 0 1-4.736-6.155zm-20.486 26.49l-.002.01h.015c8.113.017 15.32 0 24.25 9.746 7.028-.737 14.372-1.105 21.722-1.094h.006c7.35-.01 14.694.357 21.723 1.094 8.93-9.747 16.137-9.73 24.25-9.746h.014l-.002-.01c3.833 0 19.166 0 29.85 30.007L210 165.244c8.504 30.624-2.723 31.373-16.727 31.4-20.768-.773-32.267-15.855-32.267-30.935-11.496 1.884-24.907 2.826-38.318 2.827h-.006c-13.412 0-26.823-.943-38.318-2.827 0 15.08-11.5 30.162-32.267 30.935-14.004-.027-25.23-.775-16.726-31.4L46.85 124.08C57.534 94.073 72.867 94.073 76.7 94.073zm45.985 23.582v.006c-.02.02-21.863 20.08-25.79 27.215l14.304-.573v12.474c0 .584 5.74.346 11.486.08h.006c5.744.266 11.485.504 11.485-.08v-12.474l14.304.573c-3.928-7.135-25.79-27.215-25.79-27.215v-.006l-.003.002z"/></svg>
                </a>
              </div>

              {/* WhatsApp */}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-green-400 hover:scale-110 hover:shadow-lg hover:shadow-green-400/40">
                <a href="https://wa.me/5493416631601" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-white">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
              </div>

              {/* YouTube */}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-red-400 hover:scale-110 hover:shadow-lg hover:shadow-red-400/40">
                <a href="https://www.youtube.com/@noctyr-studio" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-white">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>

              {/* LinkedIn */}
              <div className="bg-zinc-800 p-2 rounded-lg transition-all duration-300 hover:bg-blue-400 hover:scale-110 hover:shadow-lg hover:shadow-blue-400/40">
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>

            </div>
          </div>

          {/* FOTO */}
          <div className="justify-self-center">
            <div className="relative">
              
              <img
                src={yoImg}
                alt="Foto de perfil"
                className="h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 rounded-3xl object-cover ring-1 ring-white/10"
              />

              <div className="absolute -left-8 -top-8 h-20 w-20 rounded-2xl bg-orange-500/20"></div>
              <div className="absolute -right-6 -bottom-6 h-16 w-16 rounded-2xl bg-indigo-500/20"></div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}