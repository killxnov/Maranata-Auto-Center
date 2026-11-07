import { Container } from "@/components/ui/Container";
import { Brand } from "@/components/ui/Brand";
import { ContactLink } from "@/components/ui/ContactLink";
import { Navbar } from "./Navbar";
import { MobileMenu } from "./MobileMenu";
import { HeaderShell } from "./HeaderShell";
export function Header() {
  return (
    <HeaderShell>
      <Container className="flex h-20 items-center justify-between gap-5">
        <Brand />
        <Navbar />
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <ContactLink className="px-4">Solicitar orçamento</ContactLink>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </HeaderShell>
  );
}
