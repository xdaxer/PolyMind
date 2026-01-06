import RegisterForm from "./registerForm";

function Register() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-neutral-950 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1313ec] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      <div className="relative z-10 w-full max-w-md flex flex-col items-center p-8 sm:p-10 bg-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
        {/* Başlık Grubu */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Hesabınızı oluşturun
          </h3>
          <p className="mt-2 text-sm text-neutral-400">
            PolyMind'a katılmak için bilgilerinizi girin.
          </p>
        </div>

        {/* Form Component */}
        <div className="w-full">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default Register;