import "./LeftPanel.css";

export default function LeftPanel() {
  return (
    <div className="relative h-auto w-3/4 text-white flex flex-col justify-center items-start px-16 py-20 left-panel overflow-hidden">
      {/* Floating blurred circles */}
      <div className="absolute top-[-160px] left-[-160px] w-[400px] h-[400px] bg-[#02298a] rounded-full blur-xl opacity-40 animate-float-random z-0"></div>
      <div className="absolute top-1/3 left-1/3 w-[200px] h-[200px] bg-[#02298a] rounded-full blur-xl opacity-40 animate-float-random delay-300 z-0"></div>
      <div className="absolute top-1/4 right-[-50px] w-[250px] h-[250px] bg-[#0b36a3] rounded-full blur-xl opacity-40 animate-float-random delay-500 z-0"></div>
      <div className="absolute top-1/2 right-[-100px] w-[300px] h-[300px] blur-sm opacity-40 animate-float-random delay-700 z-0">
        <img
          src="https://res.cloudinary.com/dhzaw6nix/image/upload/v1747390694/chaty_n6jc9d.png"
          alt=""
        />
      </div>
      <div className=" absolute bottom-1/2 right-[100px] w-[300px] h-[300px] opacity-50 animate-float-random delay-700 z-0">
        <img
          src="https://res.cloudinary.com/dhzaw6nix/image/upload/v1747390693/msg-floating_b02nxy.png"
          alt=""
        />
      </div>

      <div className=" h-[557px] w-[557px] rounded-full bg-transparent outline outline-[#0575E6] absolute top-[600px] left-[-207px]"></div>
      <div className=" h-[557px] w-[557px] rounded-full bg-transparent outline outline-[#0575E6] absolute top-[626px] left-[-126px]"></div>

      {/* Content */}
      <div className="absolute h-16 w-16 top-6 left-6 flex items-center space-x-2">
        <img
          src="https://res.cloudinary.com/dhzaw6nix/image/upload/v1747386841/logo-final_e0hmcg.png"
          alt="Logo"
          className="rounded-2xl"
        />
      </div>
      <h1 className="text-4xl ml-7 font-bold z-10">ConvoX</h1>
      <p className="ml-7 mt-4 z-10">
        An Efficient & Empathetic Conversational Companion
      </p>
      <button className="mt-5 ml-7 z-10 px-6 py-2 bg-[#0575E6] rounded-full hover:bg-white hover:text-[#3E3EFF] transition">
        Read More
      </button>
    </div>
  );
}
