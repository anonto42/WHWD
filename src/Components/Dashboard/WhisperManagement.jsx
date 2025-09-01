/* eslint-disable no-unused-vars */
import {
  Spin,
  Pagination,
  Button,
  Modal,
  Input,
  Select,
  Upload,
  ConfigProvider,
} from "antd";
import {
  useAddWhisperMutation,
  useAllWhispersQuery,
  useDeleteWhisperMutation,
  useEditWhisperMutation,
} from "../../Redux/api/whisperApi";
import { useState } from "react";
import { getImageUrl } from "../../utils/baseUrl";
import { FiUpload } from "react-icons/fi";
import { toast } from "sonner";

const WhisperManagement = () => {
  const { data: whisperData, isLoading, refetch } = useAllWhispersQuery();
  const whispers = whisperData?.data;
  console.log("whispers", whisperData);

  const [addWhisper, { isLoading: isAdding }] = useAddWhisperMutation();
  const [editWhisper, { isLoading: isEditing }] = useEditWhisperMutation();
  const [deleteWhisper, { isLoading: isDeleting }] = useDeleteWhisperMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentWhisper, setCurrentWhisper] = useState(null);

  // modal inputs
  const [whisperName, setWhisperName] = useState("");
  const [whisperSherpas, setWisperSherpas] = useState("");
  const [category, setCategory] = useState(null);
  // const [timer, setTimer] = useState(null);

  // audio files
  const [englishAudio, setEnglishAudio] = useState([]);
  const [deutschAudio, setDeutschAudio] = useState([]);
  const [francaisAudio, setFrancaisAudio] = useState([]);
  const [espanolAudio, setEspanolAudio] = useState([]);

  // lrc files
  const [englishLrc, setEnglishLrc] = useState([]);
  const [deutschLrc, setDeutschLrc] = useState([]);
  const [francaisLrc, setFrancaisLrc] = useState([]);
  const [espanolLrc, setEspanolLrc] = useState([]);

  // images
  const [coverImage, setCoverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Store the image preview URL

  const [deletingWhisperId, setDeletingWhisperId] = useState(null);
  console.log("deletingWhisperId", deletingWhisperId);

  const imageUrl = getImageUrl();

  // Handle loading state
  if (isLoading || isAdding || isEditing || isDeleting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  const categories = [
    "Hushabies",
    "WhisperPedia Wonderings",
    "Feather Stories",
  ];
  const timers = [7, 12, 20, 0];

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedWhispers = whispers?.slice(startIndex, startIndex + pageSize);
  const totalWhispers = whispers?.length;

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle modal visibility for Add/Edit
  const openAddEditModal = (whisper) => {
    console.log("selected whisper", whisper);
    if (whisper) {
      setCurrentWhisper(whisper);

      setWhisperName(whisper.whisperName);
      setWisperSherpas(whisper.whisperSherpas);
      setCategory(whisper.whisperCategory);
      // setTimer(whisper.timer);
      setEnglishAudio([whisper.EnglishFile || ""]); // prepopulate audio file paths
      setDeutschAudio([whisper.DeutschFile || ""]);
      setFrancaisAudio([whisper.FrancaisFile || ""]);
      setEspanolAudio([whisper.EspanolFile || ""]);
      setEnglishLrc([whisper.EnglishLRC || ""]);
      setDeutschLrc([whisper.DeutschLRC || ""]);
      setFrancaisLrc([whisper.FrancaisLRC || ""]);
      setEspanolLrc([whisper.EspanolLRC || ""]);
      setCoverImage(whisper.whisperCoverImage || null);
    } else {
      setCurrentWhisper(null);
      setWhisperName("");
      setWisperSherpas("");
      setCategory(null);
      // setTimer(null);
      setEnglishAudio([]);
      setDeutschAudio([]);
      setFrancaisAudio([]);
      setEspanolAudio([]);
      setEnglishLrc([]);
      setDeutschLrc([]);
      setFrancaisLrc([]);
      setEspanolLrc([]);
      setCoverImage(null);
      setImagePreview(null);
    }
    setShowAddEditModal(true);
  };

  const closeAddEditModal = () => {
    setShowAddEditModal(false);
    setCurrentWhisper(null);
    setWhisperName("");
    setWisperSherpas("");
    setCategory(null);
    // setTimer(null);
    setEnglishAudio([]);
    setDeutschAudio([]);
    setFrancaisAudio([]);
    setEspanolAudio([]);
    setEnglishLrc([]);
    setDeutschLrc([]);
    setFrancaisLrc([]);
    setEspanolLrc([]);
    setCoverImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    // if (
    //   !whisperName ||
    //   !whisperSherpas ||
    //   !category ||
    //   !coverImage ||
    //   englishAudio.length === 0 ||
    //   deutschAudio.length === 0 ||
    //   francaisAudio.length === 0 ||
    //   espanolAudio.length === 0
    // ) {
    //   toast.error("Please fill in all fields and upload 4 audio files.");
    //   return;
    // }

    const data = {
      whisperName,
      whisperSherpas,
      category,
      // timer,
      coverImage,
      audioFiles: [
        englishAudio[0],
        deutschAudio[0],
        francaisAudio[0],
        espanolAudio[0],
      ],
      lrcFiles: [englishLrc[0], deutschLrc[0], francaisLrc[0], espanolLrc[0]],
    };
    console.log("Submitted Data: ", data);

    const formData = new FormData();
    if (currentWhisper) {
      formData.append("id", currentWhisper._id);
    }
    formData.append("whisperName", whisperName);
    formData.append("whisperSherpas", whisperSherpas);
    formData.append("whisperCategory", category);
    // formData.append("timer", timer);
    formData.append("whisperCoverImage", coverImage);

    formData.append(
      "EnglishFile",
      englishAudio[0] || currentWhisper?.EnglishFile
    );
    formData.append(
      "DeutschFile",
      deutschAudio[0] || currentWhisper?.DeutschFile
    );
    formData.append(
      "FrancaisFile",
      francaisAudio[0] || currentWhisper?.FrancaisFile
    );
    formData.append(
      "EspanolFile",
      espanolAudio[0] || currentWhisper?.EspanolFile
    );

    formData.append("EnglishLRC", englishLrc[0] || currentWhisper?.EnglishLRC);
    formData.append("DeutschLRC", deutschLrc[0] || currentWhisper?.DeutschLRC);
    formData.append(
      "FrancaisLRC",
      francaisLrc[0] || currentWhisper?.FrancaisLRC
    );
    formData.append("EspanolLRC", espanolLrc[0] || currentWhisper?.EspanolLRC);

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      if (currentWhisper) {
        await editWhisper(formData).unwrap();
        toast.success("Whisper updated successfully!");
      } else {
        await addWhisper(formData).unwrap();
        toast.success("Whisper added successfully!");
      }

      closeAddEditModal();
    } catch (error) {
      console.error("Error submitting whisper:", error);
      toast.error(
        error?.data?.message ||
          `Failed to ${
            currentWhisper ? "update" : "add"
          } whisper. Please try again.`
      );
    }
  };

  const openDeleteModal = (whisperId) => {
    console.log(whisperId);
    setDeletingWhisperId(whisperId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingWhisperId(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!deletingWhisperId) {
        toast.error("No whisper selected for deletion.");
        return;
      }

      const body = {
        id: deletingWhisperId,
      };

      const response = await deleteWhisper(body).unwrap();
      console.log("delete response", response);
      toast.success("Whisper deleted successfully!");
      closeDeleteModal();
      refetch();
    } catch (error) {
      console.error("Error deleting whisper:", error);
      toast.error(
        error?.data?.message || "Failed to delete whisper. Please try again."
      );
    }
  };

  const handleAudioUpload = (file, index) => {
    const isAudio = file.type.startsWith("audio/");
    if (!isAudio) {
      toast.error("You can only upload audio files!");
      return false;
    }

    switch (index) {
      case 1:
        setEnglishAudio([file]);
        break;
      case 2:
        setDeutschAudio([file]);
        break;
      case 3:
        setFrancaisAudio([file]);
        break;
      case 4:
        setEspanolAudio([file]);
        break;
      default:
        break;
    }

    return false; // Prevent automatic upload
  };

  const handleLrcUpload = (file, index) => {
    const isLrc = file.type === "text/plain" || file.name.endsWith(".lrc");
    if (!isLrc) {
      toast.error("You can only upload LRC files!");
      return false;
    }

    switch (index) {
      case 1:
        setEnglishLrc([file]);
        break;
      case 2:
        setDeutschLrc([file]);
        break;
      case 3:
        setFrancaisLrc([file]);
        break;
      case 4:
        setEspanolLrc([file]);
        break;
      default:
        break;
    }

    return false; // Prevent automatic upload
  };

  const handleImageUpload = (info) => {
    const file = info.file;
    console.log("file", file);
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      console.error("You can only upload image files!");
      return false;
    }

    const imagePreview = URL.createObjectURL(file);
    setImagePreview(imagePreview);
    setCoverImage(file);

    return false;
  };

  return (
    <div className="px-20 py-6 lg:h-[93vh] mx-auto bg-[#334161] rounded-lg shadow">
      <p className="mb-6 text-start text-2xl font-semibold text-[#fff]">
        Our Sherpas
      </p>

      <div className="flex flex-wrap items-center gap-4">
        {paginatedWhispers?.map((data) => {
          return (
            <div
              key={data.id}
              className="flex flex-col items-center relative bg-gradient-to-tr from-[#905E26] via-[#F1CC47] to-[#F5EC9B] w-56 p-4 rounded-lg h-[280px]"
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <img
                  src={`${imageUrl}${data?.whisperCoverImage}`}
                  alt=""
                  className="rounded-full size-20"
                />
                <p className="text-lg font-semibold text-center text-[#151D4A]">
                  {data?.whisperName}
                </p>
                <p className="text-sm text-center">{data?.description}</p>
              </div>
              <div className="absolute flex flex-col items-center gap-2 bottom-2">
                <Button className="w-32" onClick={() => openAddEditModal(data)}>
                  Edit
                </Button>
                <Button
                  className="w-32 bg-[#FB6569] border-none text-white"
                  onClick={() => openDeleteModal(data._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalWhispers && (
        <div className="flex justify-center mt-6">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalWhispers}
            onChange={handlePageChange}
            showSizeChanger={false}
            showTotal={(total) => `Total ${total} whispers`}
          />
        </div>
      )}

      <Button
        className="mx-auto bg-gradient-to-tr from-[#905E26] via-[#F1CC47] to-[#F5EC9B] border-none text-[#151D4A] h-10 w-36 font-semibold text-lg"
        onClick={() => openAddEditModal()}
      >
        Add More
      </Button>

      {/* Add/Edit Modal */}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "rgb(51,65,97)",
              headerBg: "rgb(51,65,97)",
              titleColor: "#fff",
              titleFontSize: 25,
            },
            Select: {
              colorBgContainer: "rgba(0,0,0,0)",
              selectorBg: "rgba(0,0,0,0)",
              colorText: "rgb(255,255,255)",
              colorTextPlaceholder: "rgb(255,255,255)",
              colorBorder: "rgb(252,185,23)",
              hoverBorderColor: "rgb(252,185,23)",
              colorBgElevated: "rgb(7,27,73)",
              optionActiveBg: "rgb(51,65,97)",
              optionSelectedBg: "rgb(252,185,23)",
              optionHeight: 40,
            },
            Input: {
              colorText: "rgba(255,255,255)",
              activeBg: "rgb(100,118,161)",
              hoverBg: "rgb(100,118,161)",
              inputFontSize: 16,
              colorTextPlaceholder: "#aaa",
            },
            Upload: {
              colorText: "rgb(255,255,255)",
              colorIcon: "rgba(255,255,255)",
            },
            Button: {
              defaultHoverBg: "rgb(71,113,172)",
            },
          },
        }}
      >
        <Modal
          title={currentWhisper ? "Edit Whisper" : "Upload Whisper"}
          visible={showAddEditModal}
          onOk={handleSubmit}
          onCancel={closeAddEditModal}
          width={1200}
          footer={[
            <div key="footer" className="flex justify-center">
              <Button
                key="submit"
                type="primary"
                onClick={handleSubmit}
                className="w-40 h-12 text-lg bg-gradient-to-tr from-[#905E26] via-[#F1CC47] to-[#F5EC9B] border-none text-[#151D4A] font-semibold"
              >
                Publish
              </Button>
            </div>,
          ]}
          closable={true}
          closeIcon={
            <span className="text-xl text-white hover:text-gray-300">×</span>
          }
        >
          <div className="flex flex-col w-full h-auto gap-5 p-5 mt-10">
            <div className="flex items-center w-full gap-5">
              <Button className="h-20 border-2 border-dashed border-[#FCB917] rounded-lg bg-transparent">
                <Upload
                  maxCount={1}
                  listType="picture"
                  accept="image/*"
                  onChange={handleImageUpload}
                  showUploadList={false}
                  beforeUpload={() => false}
                >
                  <div className="flex items-center gap-2 text-[#FCB917] p-3 text-lg font-medium">
                    <FiUpload />
                    <p>Upload Cover Photo</p>
                  </div>
                </Upload>
              </Button>{" "}
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Cover"
                  className="w-40 h-20 rounded-lg"
                />
              ) : (
                currentWhisper &&
                currentWhisper.whisperCoverImage && (
                  <img
                    src={`${imageUrl}${currentWhisper.whisperCoverImage}`}
                    alt="Cover"
                    className="w-40 h-20 rounded-lg"
                  />
                )
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {[1, 2, 3, 4].map((index) => (
                <Button
                  key={index}
                  className="h-20 border-2 border-dashed border-[#FCB917] rounded-lg bg-transparent"
                >
                  <Upload
                    showUploadList={true}
                    beforeUpload={(file) => handleAudioUpload(file, index)}
                    accept="audio/*"
                    fileList={
                      index === 1
                        ? englishAudio
                        : index === 2
                        ? deutschAudio
                        : index === 3
                        ? francaisAudio
                        : espanolAudio
                    }
                  >
                    <div className="flex items-center gap-2 text-[#FCB917] p-3 text-lg font-medium">
                      <FiUpload />
                      <p>
                        Upload Audio{" "}
                        {index === 1
                          ? "English"
                          : index === 2
                          ? "Deutsch"
                          : index === 3
                          ? "Français"
                          : "Español"}
                      </p>
                    </div>
                  </Upload>
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {[1, 2, 3, 4].map((index) => (
                <Button
                  key={index}
                  className="h-20 border-2 border-dashed border-[#FCB917] rounded-lg bg-transparent"
                >
                  <Upload
                    showUploadList={true}
                    beforeUpload={(file) => handleLrcUpload(file, index)}
                    accept=".lrc"
                    fileList={
                      index === 1
                        ? englishLrc
                        : index === 2
                        ? deutschLrc
                        : index === 3
                        ? francaisLrc
                        : espanolLrc
                    }
                  >
                    <div className="flex items-center gap-2 text-[#FCB917] p-3 text-lg font-medium">
                      <FiUpload />
                      <p>
                        Upload LRC{" "}
                        {index === 1
                          ? "English"
                          : index === 2
                          ? "Deutsch"
                          : index === 3
                          ? "Français"
                          : "Español"}
                      </p>
                    </div>
                  </Upload>
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Input
                value={whisperName}
                onChange={(e) => setWhisperName(e.target.value)}
                placeholder="Type Whisper Name Here"
                className="h-12 bg-transparent border-[#FCB917]"
              />{" "}
              <Input
                value={whisperSherpas}
                onChange={(e) => setWisperSherpas(e.target.value)}
                placeholder="Type Sherpa Name Here"
                className="h-12 bg-transparent border-[#FCB917]"
              />
            </div>
            <div className="flex items-start gap-5">
              {/* <Select
                value={timer}
                onChange={(value) => setTimer(value)}
                placeholder="Select Timer"
                style={{
                  width: "100%",
                  height: "48px",
                  background: "transparent",
                }}
              >
                {timers.map((timer, index) => (
                  <Select.Option key={index} value={timer}>
                    {timer}
                  </Select.Option>
                ))}
              </Select> */}
              <Select
                value={category}
                onChange={(value) => setCategory(value)}
                placeholder="Select Category"
                style={{
                  width: "100%",
                  height: "48px",
                  background: "transparent",
                }}
              >
                {categories.map((category, index) => (
                  <Select.Option key={index} value={category}>
                    {category}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>
        </Modal>
      </ConfigProvider>

      {/* Delete Confirmation Modal */}
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: "rgb(51,65,97)",
              headerBg: "rgb(51,65,97)",
              titleColor: "#fff",
              titleFontSize: 25,
            },
          },
        }}
      >
        <Modal
          title="Delete Whisper"
          visible={showDeleteModal}
          onCancel={closeDeleteModal}
          onOk={handleDeleteConfirm}
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <p className="text-white">
            Are you sure you want to delete this whisper?
          </p>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default WhisperManagement;
