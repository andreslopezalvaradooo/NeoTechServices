"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateUser, useSession } from "@/src/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type ProfileValues = z.infer<typeof profileSchema>;

const ALLOWED_EXTENSIONS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

const MAX_FILE_SIZE = 5;

export default function ProfilePage() {
  const { data: session, error: sessionError, isPending } = useSession();
  const user = session?.user;
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (user) reset({ name: user.name ?? "" });
  }, [user, reset]);

  useEffect(() => {
    if (sessionError) setError("root", { message: sessionError.message });
    else clearErrors("root");
  }, [sessionError, setError, clearErrors]);

  const uploadToCloudinary = useCallback(
    async (file: File) => {
      setIsUploadingImage(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Upload failed (${res.status})`);
        }

        const { url, error } = await res.json();
        if (error) throw new Error(error);
        await updateUser({ image: url });
        setImagePreview(url);
      } catch (err) {
        setError("root", {
          message: err instanceof Error ? err.message : "Image upload failed",
        });

        setImagePreview(null);
      } finally {
        setIsUploadingImage(false);
      }
    },
    [setError],
  );

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_EXTENSIONS.includes(file.type)) {
      setError("root", {
        message: "Only JPEG, PNG, WebP or GIF images are allowed",
      });

      return;
    }

    if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
      setError("root", {
        message: `Image must be smaller than ${MAX_FILE_SIZE}MB`,
      });

      return;
    }

    clearErrors("root");
    if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
    setImagePreview(URL.createObjectURL(file));
    uploadToCloudinary(file);
    e.target.value = "";
  }

  async function onSubmit(values: ProfileValues) {
    const { error } = await updateUser(values);
    if (error) setError("root", { message: error.message });
    else clearErrors("root");
  }

  const currentImage = imagePreview ?? user?.image ?? "/no-profile-photo.png";
  const isImageBlob = currentImage.startsWith("blob:");

  return (
    <Card className="my-4 md:my-8 relative mx-auto w-full max-w-sm pt-0">
      <Input
        ref={fileInputRef}
        id="picture"
        type="file"
        accept={ALLOWED_EXTENSIONS.join(",")}
        className="sr-only"
        onChange={handleImageChange}
        tabIndex={-1}
        aria-hidden="true"
      />

      <label
        htmlFor="picture"
        className="group relative block cursor-pointer"
        aria-label="Change profile picture"
        aria-busy={isUploadingImage}
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            src={currentImage}
            alt={`${user?.name ?? "User"} profile picture`}
            className="object-cover transition-[filter] duration-200 group-hover:brightness-50 group-hover:grayscale"
            unoptimized={isImageBlob}
            priority
          />
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
          style={{ opacity: isUploadingImage ? 1 : undefined }}
        >
          <div
            className={`flex flex-col items-center gap-1 text-white transition-opacity duration-200 ${
              isUploadingImage
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <HugeiconsIcon
              icon={Camera}
              className={isUploadingImage ? "animate-pulse" : ""}
            />

            <span className="text-xs font-medium drop-shadow">
              {isUploadingImage ? "Uploading..." : "Change photo"}
            </span>
          </div>
        </div>
      </label>

      <CardHeader>
        <CardTitle>{user?.email}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet disabled={isPending || isSubmitting || isUploadingImage}>
            <FieldGroup>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="name">
                      You can edit your name
                    </FieldLabel>

                    <ButtonGroup>
                      <Input
                        {...field}
                        id="name"
                        placeholder={user?.name ?? "Your name"}
                        aria-invalid={fieldState.invalid}
                      />

                      <Button
                        type="submit"
                        variant="outline"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Saving..." : "Edit"}
                      </Button>
                    </ButtonGroup>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {errors.root && (
                <p role="alert" className="text-sm text-destructive">
                  {errors.root.message}
                </p>
              )}
            </FieldGroup>
          </FieldSet>
        </form>
      </CardContent>
    </Card>
  );
}
