import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Fieldset,
  Flex,
  HStack,
  Icon,
  Input,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Form } from "react-bootstrap";
import { LuFileUp } from "react-icons/lu";
import { CloseButton } from "../components/ui/close-button";
import { showToast } from "./ToastComponent";
import axios from "axios";
import Aos from "aos";

export default function AddPost() {

    useEffect(()=>{
      Aos.init({
        duration:500,
        delay:200
      });
    },[]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [selectedFiles, setSelectedFiles] = useState([]);

  const resetVal = () => {
    setSelectedFiles([]);
    setValue("images", []); // Reset React Hook Form field
  };

  const validate = (data) => {
    if (selectedFiles.length > 0 && data.address) return true;
    else {
      showToast("Please fill all the fields", "warning");
      return false;
    }
  };

  const [load, setLoad] = useState(false);

  const addData = async (data) => {
    if (validate(data)) {
      const formData = new FormData();

      if(data.imageFile && data.imageFile.length > 0){
        formData.append('imageFile',data.imageFile[0]);
      }
      formData.append("address",data.address);
      formData.append("description",data.description);

      try {
        setLoad(true);
        let url = String(import.meta.env.VITE_URL);
        url += "api/v1//imageUpload";

        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          showToast(response.data.message, "success");
        } else {
          showToast(response.data.message, "error");
        }
        setLoad(false);
        reset();
        resetVal();
      } catch (err) {
        reset();
        resetVal();
        if (err.response) {
          // Server responded with a status code outside 2xx
          showToast(err.response.data.message || "Login failed", "error");
        } else {
          // Network or unknown error
          showToast("Something went wrong. Please try again.", "error");
        }
      } finally {
        setLoad(false);
      }
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]); // Store full File objects
    setValue("imageFile", [...selectedFiles, ...files]); // Update form state
  };

  const removeFile = (fileName) => {
    const updatedFiles = selectedFiles.filter((file) => file.name !== fileName);
    setSelectedFiles(updatedFiles);
    setValue("imageFile", updatedFiles); // Update form state

    // Reset the file input (since file input value cannot be updated directly)
    document.getElementById("file-upload").value = "";
  };

  return (
    <div className="container mt-5">
      <Form className="mt-5 mb-3 bg-light p-2 shadow-lg" data-aos="fade-up" onSubmit={handleSubmit(addData)} >
        <Fieldset.Root size="lg" invalid>
          <Fieldset.Legend>Add Post</Fieldset.Legend>
          <Fieldset.Content>
            <Field
              label="Images"
              invalid={!!errors.images}
              errorText={errors.images?.message}
            >
              <Flex
                direction="column"
                align="center"
                width={"100%"}
                justify="center"
                gap={4}
                border="2px dashed #3182CE"
                borderRadius="md"
                p={6}
                bg="gray.50"
                _hover={{ bg: "gray.100" }}
              >
                {/* Hidden File Input */}
                <Input
                  type="file"
                  accept="image/*"
                  {...register("imageFile")}
                  display="none"
                  id="file-upload"
                  onChange={handleFileChange}
                />

                {/* File Upload Button */}
                <label htmlFor="file-upload">
                  <Button
                    colorPalette={"blue"}
                    as="span"
                    leftIcon={<Icon as={LuFileUp} />}
                    colorScheme="blue"
                  >
                    Upload Images
                  </Button>
                </label>

                {/* Upload Instructions */}
                <Text fontSize="sm" color="gray.600">
                  Drag and drop files here or click to browse. <br />
                  (Only images, up to 5MB)
                </Text>
              </Flex>

              {/* Display Selected Files */}
              {selectedFiles.length > 0 && (
                <Box mt={3} width="100%">
                  <Text fontWeight="bold">Selected Files:</Text>
                  {selectedFiles.map((file, index) => (
                    <HStack
                      key={index}
                      justify="space-between"
                      bg="gray.100"
                      p={2}
                      borderRadius="md"
                      mt={1}
                    >
                      <Text fontSize="sm" color="gray.700">
                        {file.name}
                      </Text>
                      <CloseButton
                        size="sm"
                        onClick={() => removeFile(file.name)}
                      />
                    </HStack>
                  ))}
                </Box>
              )}
            </Field>

            <Field
              label="Address"
              invalid={!!errors.address}
              errorText={errors.address?.message}
            >
              <Input
                placeholder="Enter Address"
                name="address"
                colorPalette={"blue"}
                required
                {...register("address")}
              />
            </Field>

            <Field label="Description">
              <Textarea
                placeholder="Description"
                name="description"
                colorPalette={"blue"}
                {...register("description")}
              />
            </Field>

            <HStack marginBottom={"2%"}>
              <Button
                type="submit"
                disabled={load}
                variant={"ghost"}
                colorPalette={"green"}
                width={"50%"}
              >
                {load ? <Spinner /> : "Submit"}
              </Button>
              <Button
                type="reset"
                onClick={resetVal}
                colorPalette={"red"}
                variant={"ghost"}
                width={"50%"}
              >
                Reset
              </Button>
            </HStack>
          </Fieldset.Content>
        </Fieldset.Root>
      </Form>
    </div>
  );
}
