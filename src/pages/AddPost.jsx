import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Fieldset, HStack, Input, Textarea } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Form } from "react-bootstrap";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "../components/ui/file-upload";

export default function AddPost() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset: resetForm,
  } = useForm();

  const resetVal = () =>{
    console.log('hi')
    setValue("images",{});
  }

  const addData =(data)=>{
    console.log(data);
  }

  return (
    <div className="container mt-5">
      <Form className="mt-5 mb-3" onSubmit={handleSubmit(addData)}>
        <Fieldset.Root size="lg" invalid>
          <Fieldset.Legend>Add Post</Fieldset.Legend>
          <Fieldset.Content>
            <Field
              label="Images"
              invalid={!!errors.images}
              errorText={errors.images?.message}
            >
              <FileUploadRoot colorPalette={'blue'} alignItems="stretch" maxFiles={10} {...register('images')}>
                <FileUploadDropzone
                  label="Drag and drop here to upload"
                  description=".png, .jpg up to 5MB"
                />
                <FileUploadList/>
              </FileUploadRoot>
            </Field>
            <Field
              label="Address"
              invalid={!!errors.address}
              errorText={errors.address?.message}
            >
              <Input name="address" colorPalette={'blue'} required {...register("address")} />
            </Field>
            <Field label="Description">
              <Textarea name="description" colorPalette={'blue'} {...register("description")} />
            </Field>
            <HStack marginBottom={'2%'}>
            <Button type="submit" variant={"ghost"} colorPalette={'green'} width={'50%'}>
                Submit
            </Button>
            <Button type="reset" onClick={resetVal} colorPalette={'red'} variant={"ghost"} width={'50%'}>
                Reset
            </Button>
            </HStack>
          </Fieldset.Content>
        </Fieldset.Root>
      </Form>
    </div>
  );
}
