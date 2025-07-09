import { BookOpenText, Download } from "lucide-react";
import { BookDocument } from "./components/BookDocument";
import { PDFDownloadLink, PDFViewer } from "@/components/custom/pdf";
import { getFullStory } from "@/api/acts";
import { cookies } from "next/headers";
import { decrypt } from "@/app/_lib/session";
import Image from "next/image";

export default async function MinhaHistoria() {
  const cookie = await cookies();
  const session = decrypt(cookie.get("session")?.value);
  const chapters = await getFullStory();

  return (
    <div className="flex size-full justify-end p-2 md:p-4">
      <div className="flex flex-col h-full w-fit max-w-full items-center gap-4">
        <div
          className={"flex flex-col p-16 h-9/10 aspect-[0.705] items-center justify-between bg-[#262626] text-white"}
        >
          <div className={"text-sm italic"}>
            <span>{session?.name}</span>
          </div>
          <div className={"flex flex-col gap-4"}>
            <span className={"text-4xl md:text-6xl font-bold"}>
              EU, EU MESM{session?.gender === "FEMALE" ? "A" : "O"} E ZUMIRA
            </span>
            <span className={"text-sm md:text-base leading-tight"}>
              Descubra como transformar a sua história em uma obra literária de cura e inspiração.
            </span>
          </div>
          <Image width={30} height={30} alt="Icon Zumira" src="/icon-green.png" />
        </div>

        <PDFDownloadLink
          className="flex flex-row size-fit gap-2 text-text-25 px-4 py-1 bg-primary-500 rounded-full items-center"
          document={
            <BookDocument data={chapters} username={session?.name ?? "Usuário"} gender={session?.gender ?? "OTHER"} />
          }
          fileName="Minha história por Zumira"
        >
          <Download className="size-4.5" />
          <span className="font-semibold">Baixar</span>
        </PDFDownloadLink>
      </div>
    </div>
  );
}
