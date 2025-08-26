import english from "../../../public/images/language/english.png";
import french from "../../../public/images/language/french.png";
import german from "../../../public/images/language/german.png";
import spanish from "../../../public/images/language/spanish.png";

const Language = () => {
  return (
    <div className="flex flex-col gap-8 min-h-[93vh] p-10">
      <p className="text-3xl font-semibold text-white">Language</p>
      <div className="flex items-start gap-5">
        <img src={english} alt="English" className="h-72 w-52" />
        <img src={french} alt="English" className="h-72 w-52" />
        <img src={german} alt="English" className="h-72 w-52" />
        <img src={spanish} alt="English" className="h-72 w-52" />
      </div>
    </div>
  );
};

export default Language;
