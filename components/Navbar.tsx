import Link from "next/link";
import Image from "next/image";

import LiquidEther from "./ui/LiquidEther";
import GooeyNav from "./GooeyNav";

const Navbar = () => {
  return (
    <>
      <header>
        <nav>
          <Link href="/" className="logo">
            <Image src="/icons/logo.png" alt="Logo" width={24} height={24} />

            <p>Dev Events</p>
          </Link>
          <GooeyNav
            items={[
              { label: "Home", href: "/" },
              { label: "Events", href: "/events" },
              { label: "Create", href: "/create" },
            ]}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </nav>
      </header>

      <div className="fixed inset-0 top-0 z-[-1] min-h-screen">
        <LiquidEther
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
    </>
  );
};

export default Navbar;
