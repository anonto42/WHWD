const categoryData = [
  {
    id: 1,
    title: "Stories (Feathers)",
    description: "Whispered tales for tiny hearts--night-night magic inside",
    icon: "/public/images/categoryImage/category01.png",
  },
  {
    id: 2,
    title: "Hushabies",
    description: "Gentle lullabies sung or narrated to soothe little hearts",
    icon: "/public/images/categoryImage/category02.png",
  },
  {
    id: 3,
    title: "WhisperPedia Wonderings",
    description:
      "For curious Whispies and parents: gentle wonders, dream lore, bedtime answers.",
    icon: "/public/images/categoryImage/category03.png",
  },
];

const CategoryManagement = () => {
  return (
    <div className="px-40 py-6 lg:h-[93vh] mx-auto bg-[#334161] rounded-lg shadow">
      <p className="mb-6 text-start text-2xl font-semibold text-[#fff]">
        Category
      </p>

      <div className="flex items-center gap-5">
        {categoryData.map((data) => {
          return (
            <div
              key={data.id}
              className="flex flex-col items-center bg-gradient-to-tr from-[#905E26] via-[#F1CC47] to-[#F5EC9B] w-56 p-4 rounded-lg h-[280px]"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <img src={data?.icon} alt="" className="h-16 w-14" />
                <p className="text-xl font-bold text-center w-28 text-[#151D4A]">
                  {data?.title}
                </p>
                <p className="text-sm text-center text-[#151D4A]">
                  {data?.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryManagement;
