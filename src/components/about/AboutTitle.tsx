export const AboutTitle = () => (
  <h1 className="font-bold">
    <span
      className="text-4xl sm:text-6xl  text-transparent 
      bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500"
    >
      いなり
    </span>
    <span
      className="text-3xl md:text-5xl dark:text-transparent 
      dark:bg-clip-text dark:bg-gradient-to-r from-orange-500 to-blue-500"
    >
      が
    </span>
    <span
      className="text-4xl sm:text-6xl text-transparent 
      bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500"
    >
      DIY
    </span>
    <br />
    <small className="pl-4 text-xl md:text-2xl font-normal dark:text-trueGray-100">
      by 無名の高校生
      <a
        className="pl-4 sm:pl-1 text-xl text-gray-500"
        href={process.env.NEXT_PUBLIC_TWITTER}
      >
        @unknown_gakusei
      </a>
    </small>
  </h1>
);
