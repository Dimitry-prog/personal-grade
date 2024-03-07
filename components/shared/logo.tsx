import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <div className="w-60 md:w-80">
      <Link href="/">
        <Image
          src="/icons/logo-white.svg"
          alt="logo"
          width={100}
          height={32}
          className="w-full object-cover"
          loading="lazy"
        />
      </Link>
    </div>
  );
};

export default Logo;
