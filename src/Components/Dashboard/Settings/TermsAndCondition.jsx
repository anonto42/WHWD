import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useGetTermsConditionsQuery,
  useUpdateTermsConditionsMutation,
} from "../../../Redux/api/settingsApi";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    data: getTermsData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetTermsConditionsQuery();
  console.log(getTermsData?.data);

  const [updateTerms, { isLoading: isUpdating }] =
    useUpdateTermsConditionsMutation();

  useEffect(() => {
    if (getTermsData?.data) {
      setContent(getTermsData.data);
    }
  }, [getTermsData]);

  const handleOnSave = async () => {
    console.log("Saved T&C");
    try {
      const data = { data: content };
      await updateTerms(data).unwrap();
      toast.success("Terms Of Service updated successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to save Terms Of Service. Please try again.");
      console.error("Save error:", error);
    }
  };

  const joditConfig = {
    height: 500,
    readonly: false,
    theme: "default",
    defaultAction: "insert",
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "font",
      "fontsize",
      "brush",
      "|",
      "align",
      "ul",
      "ol",
      "|",
      "link",
      "image",
      "table",
      "|",
      "undo",
      "redo",
      "|",
      "fullsize",
      "preview",
    ],
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    toolbarAdaptive: false,
    placeholder: "Start typing your privacy policy...",
    spellcheck: true,
    language: "en",
    // Custom styling options
    style: {
      background: "#233458",
      color: "#e6e6e6",
    },
  };

  if (isFetching || isUpdating) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" tip="Loading Terms Of Service..." />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-white">
        Error loading Terms Of Service. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-[93vh] bg-[#233458] py-1 px-8 rounded-lg">
      <div className="p-2 rounded">
        <h1 className="text-4xl font-bold py-4  text-[#fff]">
          Terms And Conditions
        </h1>
        <div className="flex flex-col items-center">
          <div className="w-full">
            <JoditEditor
              ref={editor}
              value={content}
              config={joditConfig}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
          <Button
            onClick={handleOnSave}
            loading={isUpdating}
            className="w-72 py-6 border !border-[#5A199B] hover:border-[#5A199B] text-xl !text-white bg-gradient-to-r from-[#D7A52C] to-[#A020F0] hover:!bg-[#5A199B] font-semibold rounded-3xl mt-8 transition-all duration-300 ease-in-out"
          >
            {isUpdating ? "Saving..." : " Save Terms & Conditions"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default TermsAndCondition;
