import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../atoms';

/**
 * FileUpload Component (Organism)
 * File upload with drag-and-drop support
 */
const FileUpload = ({
  onUpload,
  accept = '*/*',
  multiple = false,
  maxSize = 5242880, // 5MB
  maxFiles = 5,
  className = '',
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const inputRef = useRef(null);

  const validateFile = (file) => {
    if (file.size > maxSize) {
      return `File "${file.name}" exceeds ${(maxSize / 1024 / 1024).toFixed(2)}MB limit`;
    }
    return null;
  };

  const handleFiles = (fileList) => {
    const filesArray = Array.from(fileList);
    const newErrors = [];
    const validFiles = [];

    if (files.length + filesArray.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed`);
      setErrors(newErrors);
      return;
    }

    filesArray.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(updatedFiles);
      onUpload?.(updatedFiles);
    }

    setErrors(newErrors);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onUpload?.(updatedFiles);
  };

  const fileUploadClasses = [
    'file-upload',
    dragActive && 'file-upload--drag-active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={fileUploadClasses}>
      <div
        className="file-upload__dropzone"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="file-upload__input"
          onChange={handleChange}
          accept={accept}
          multiple={multiple}
          hidden
        />
        
        <div className="file-upload__content">
          <span className="file-upload__icon">📁</span>
          <p className="file-upload__text">
            Drag and drop files here, or click to browse
          </p>
          <p className="file-upload__hint">
            Max {maxFiles} files, {(maxSize / 1024 / 1024).toFixed(2)}MB each
          </p>
        </div>
      </div>
      
      {errors.length > 0 && (
        <div className="file-upload__errors">
          {errors.map((error, index) => (
            <p key={index} className="file-upload__error">
              {error}
            </p>
          ))}
        </div>
      )}
      
      {files.length > 0 && (
        <div className="file-upload__files">
          {files.map((file, index) => (
            <div key={index} className="file-upload__file">
              <span className="file-upload__file-name">{file.name}</span>
              <span className="file-upload__file-size">
                {(file.size / 1024).toFixed(2)} KB
              </span>
              <Button
                variant="ghost"
                size="small"
                onClick={() => removeFile(index)}
                icon={<span>✕</span>}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  onUpload: PropTypes.func,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  maxFiles: PropTypes.number,
  className: PropTypes.string,
};

export default FileUpload;
