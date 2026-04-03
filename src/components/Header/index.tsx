import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export function Header() {
  return (
    <header className="w-full relative z-50">
      <div className="block lg:hidden">
        <MobileHeader />
      </div>
      <div className="hidden lg:block">
        <DesktopHeader />
      </div>
    </header>
  );
}
