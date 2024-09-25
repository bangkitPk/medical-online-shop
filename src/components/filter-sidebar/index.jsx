import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FilterSidebar() {
  return (
    <div className="sticky top-[12px]">
      <span className="font-bold">Filter</span>
      <Accordion type="single" collapsible className="w-52 px-2">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <span className="font-bold">Kategori</span>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-3">
              <li>Alat Kesehatan Umum</li>
              <li>Alat Bantu Pernafasan</li>
              <li>Peralatan Bedah</li>
              <li>Alat Terapi dan Rehabilitasi</li>
              <li>Alat Kesehatan Ibu dan Anak</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>
    </div>
  );
}
