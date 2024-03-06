import Image from 'next/image';

const Logo = () => {
  return (
    <div className="w-60 md:w-80">
      <Image
        src="/icons/logo-white.svg"
        alt="logo"
        width={100}
        height={32}
        className="w-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default Logo;
