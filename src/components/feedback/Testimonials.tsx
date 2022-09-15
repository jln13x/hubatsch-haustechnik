import useEmblaCarousel from "embla-carousel-react";
import autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";

const testimonals = [
  {
    text: "Absolut grandios!! Stromausfall nach 18 Uhr und innerhalb von 40 Minuten war alles wieder gerichtet, so einen schnellen und guten Service findet man heute kaum noch. Ich bin sehr dankbar für diesen tollen Service, auch die Nacharbeiten wurden pünktlich, schnell und korrekt durchgeführt. Ich fühle mich hier bestens beraten und aufgehoben und es ist hier wirklich jeden Euro wert! Eine absolute klare Empfehlung, schön dass es sowas noch gibt, vielen Dank!!",
    author: "Caroline Veenstra",
    rating: 5,
  },
  {
    text: "Wir haben sehr kurzfristig einen Termin (am gleichen Tag noch) bekommen, der zuverlässig eingehalten wurde. Alles war schnell und sehr ordentlich erledigt. Jederzeit wieder gerne!",
    author: "vonhierausweiter",
    rating: 5,
  },
  {
    text: "Unsere elekt. Markise musste angeschlossen werden. Firma Hubatsch kam sehr schnell. nette Mitarbeiter, sehr sauber und schnell gearbeitet. Wir können diese Firma nur empfehlen.",
    author: "Evelyn Gardemann",
    rating: 5,
  },
  {
    text: "Super Firma: waren weit und breit die einzigen, die uns einen Baustromverteiler stellen konnten. Beratung und Termine auch nach Feierabend möglich, selbstständiges Prüfen des Baustromverteilers und transparente Abrechnung gehörten alles dazu.",
    author: "Bastian Conze",
    rating: 5,
  },
  {
    text: "Plötzlich war das halbe Haus ohne Strom. Hr. Hubatsch kam noch spontan vorbei, 18 Uhr hatte ich angerufen, und hat uns innerhalb von 30 Minuten den Hals gerettet. Vielen Dank nochmals.👍",
    author: "Dirk Grundmann",
    rating: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      skipSnaps: false,
    },
    [autoplay()]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const onSlideClick = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  return (
    <div className="overflow-hidden w-full" ref={emblaRef}>
      <div className="flex w-full grow">
        {testimonals.map((t, idx) => (
          <Testimonial
            author={t.author}
            text={t.text}
            rating={t.rating}
            isActive={activeIndex === idx}
            key={`${idx}_${t.author}`}
            onClick={() => onSlideClick(idx)}
          />
        ))}
      </div>
    </div>
  );
}

interface TestimonialProps {
  text: string;
  rating: number;
  author: string;
  isActive: boolean;
  onClick: () => void;
}

const Testimonial = ({
  text,
  rating,
  author,
  isActive,
  onClick,
}: TestimonialProps) => {
  return (
    <div
      className={`w-full md:w-1/3 rounded-md p-4 shrink-0 text-center transition-colors duration-300 ease-in-out cursor-grab ${
        isActive
          ? "text-white opacity-100 mx-auto"
          : "text-neutral-400 opacity-40 hover:opacity-60 "
      }
    `}
      onClick={onClick}
    >
      <p className="tracking-wide">{text}</p>
      <div className="mt-4 flex flex-col items-center">
        <p className="font-bold mt-1">- {author}</p>
      </div>
    </div>
  );
};
