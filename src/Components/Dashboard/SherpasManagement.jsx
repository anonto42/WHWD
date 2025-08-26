const sherpasData = [
  {
    id: 1,
    title: "Hootabelle, the Owl",
    description:
      "Guardian of Soothing Questions. She whispers answers only the quiet can hear. ",
    image: "/public/images/sherpasImage/sherpas1.png",
  },
  {
    id: 2,
    title: "Wisp, the Fox",
    description:
      "Keeper of Quiet Questions. He collects the little wonders children whisper to the sky when no one else is listening. ",
    image: "/public/images/sherpasImage/sherpas5.png",
  },
  {
    id: 3,
    title: "Mahina, the Dolphin",
    description:
      "Guardian of the Dream Sea. She guides Whispies across starlit waters with her glowing tail.",
    image: "/public/images/sherpasImage/sherpas6.png",
  },
  {
    id: 4,
    title: "Cosmo, the Comet",
    description:
      "The Playful WonderBringer. He rushes through bedtime skies with giggles and sparkles.",
    image: "/public/images/sherpasImage/sherpas4.png",
  },
  {
    id: 5,
    title: "Luna, the Lightkeeper",
    description:
      "Guardian of Gentle Dreams. She sees every child as a star waiting to glow.",
    image: "/public/images/sherpasImage/sherpas3.png",
  },
  {
    id: 6,
    title: "Shnoym, the Elf",
    description:
      "Guardian of Gentle Knowzleberry Knowledge. He has facts that make children smile and tickle their brains.",
    image: "/public/images/sherpasImage/sherpas2.png",
  },
];

const SherpasManagement = () => {
  return (
    <div className="px-40 py-6 lg:h-[93vh] mx-auto bg-[#334161] rounded-lg shadow">
      <p className="mb-6 text-start text-2xl font-semibold text-[#fff]">
        Our Sherpas
      </p>

      <div className="flex flex-wrap items-center gap-5">
        {sherpasData.map((data) => {
          return (
            <div
              key={data.id}
              className="bg-gradient-to-tr from-[#905E26] via-[#F1CC47] to-[#F5EC9B] w-64 p-4 rounded-lg h-[280px]"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <img src={data?.image} alt="" className="w-20 h-24" />
                <p className="text-lg font-bold text-center">
                  {data?.title}
                </p>
                <p className="text-sm text-center">{data?.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SherpasManagement;
