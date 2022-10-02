import { FaEdit } from "react-icons/fa";
import Placeholder from "../../assets/placeholder.png";
import { apiUrl } from "../Utils/utility";

const ImageWithPlaceholder = ({
  fileInputHandler,
  file = null,
  resourceUrl = null,
  isImage = true,
}) => {
  return (
    <div className="image-upload-container mb-3">
      <div className="image-upload">
        <label htmlFor="file-input" className="label">
          <FaEdit />
        </label>
        <input
          id="file-input"
          type="file"
          name="file"
          onChange={fileInputHandler}
        />
      </div>
      {isImage ? (
        <img
          className="image"
          src={
            file
              ? URL.createObjectURL(file[0])
              : resourceUrl
              ? apiUrl + resourceUrl
              : Placeholder
          }
          alt=""
        ></img>
      ) : (
        <video width="100%" height="240" controls>
          <source src={file ? URL.createObjectURL(file[0]) : Placeholder} />
        </video>
      )}
    </div>
  );
};

export default ImageWithPlaceholder;
