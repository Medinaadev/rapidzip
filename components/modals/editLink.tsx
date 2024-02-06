"use client";
import { Modal } from "./modal";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import SignoutIcon from "@/components/icons/signout";
import toast from "react-hot-toast";
import { Link } from "@prisma/client";
import WarnIcon from "../icons/warn";
import { useForm } from "react-hook-form";
import Button from "../ui/button";
import EditIcon from "../icons/edit";
import { trpc } from "@/app/_trpc/client";

const context = createContext({
    isOpen: false,
    link: {} as Link,
    // onClose tiene que devolver un boolean
    open: (link: Link, onClose: (success?: any) => void) => {},
    close: (isSuccess?: boolean) => {},
});

export const useEditLinkModal = () => useContext(context);

export const EditLinkModalProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [link, setLink] = useState<Link>({} as Link);
    const ref = useRef<(success?: any) => void>(() => {});

    const open = (link: Link, onClose: (success?: any) => void) => {
        setIsOpen(true);
        setLink(link);
        ref.current = onClose;
    };

    const close = (isSuccess?: boolean) => {
        setIsOpen(false);
        ref.current(isSuccess);
    };

    return (
        <context.Provider value={{ isOpen, link, open, close }}>
            <EditLinkModal />
            {children}
        </context.Provider>
    );
};

type FormValues = {
    url: string;
    description: string;
};

export const EditLinkModal = () => {
    const { isOpen, link, close } = useEditLinkModal();
    const [toastId, setToastId] = useState<string | undefined>();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>();
    const { mutate: editLink } = trpc.links.editLink.useMutation({
        onSuccess: () => {
            toast.success("Link edited!", {
                id: toastId,
            });
            close(true);
        },
        onError: (err) => {
            toast.error(err.message, {
                id: toastId,
            });
            close(false);
        },
    });

    const onSubmit = (data: FormValues) => {
        if (data.url === link.url && data.description === link.description) {
            toast.error("You didn't change anything!");
            return;
        }

        const toastId = toast.loading("Editing link...");
        setToastId(toastId);

        editLink({ id: link.id, url: data.url, description: data.description });
    };

    useEffect(() => {
        if (isOpen) {
            setValue("url", link.url);
            setValue("description", link.description || "");
        } else {
            setValue("url", "");
            setValue("description", "");
        }
    }, [isOpen, link, setValue]);

    return (
        <Modal isOpen={isOpen}>
            <h1 className="text-white text-lg font-semibold">
                Edit link <span className="text-gray-400">/{link.alias}</span>
            </h1>
            <p className="flex items-center bg-red-500/10 shadow-md w-fit text-red-500 text-sm font-medium rounded-md px-2 py-1 mt-2">
                <WarnIcon className="w-4 h-4 mr-2" />
                This action is irreversible
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <div className="mt-4">
                    <label
                        htmlFor="link"
                        className="text-white/60 text-sm font-semibold"
                    >
                        Enter your link here
                    </label>
                    <input
                        type="text"
                        id="link"
                        placeholder="https://..."
                        className="text-sm w-full bg-gray-800/50 border-[1px] border-white/10 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-white/20"
                        {...register("url", {
                            required: {
                                value: true,
                                message: "Please enter a link",
                            },
                            minLength: {
                                value: 8,
                                message:
                                    "Please enter a valid link, e.g. https://google.com",
                            },
                            pattern: {
                                value: /^https?:\/\/.*/i,
                                message:
                                    "Please enter a valid link, e.g. https://google.com",
                            },
                        })}
                        {...(errors.url && {
                            className:
                                "text-sm w-full bg-gray-800/50 border-[1px] border-red-500/50 rounded-md px-3 py-2 mt-1 focus:outline-none",
                        })}
                    />
                    {errors.url && (
                        <p className="text-xs text-red-400 mt-1">
                            {errors.url.message}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="description"
                        className="text-white/60 text-sm font-semibold"
                    >
                        Description (optional)
                    </label>
                    <textarea
                        id="description"
                        placeholder="Enter a description for your link"
                        className="resize-none text-sm w-full bg-gray-800/50 border-[1px] border-white/10 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-white/20"
                        {...register("description", {
                            maxLength: {
                                value: 100,
                                message:
                                    "Please enter a description with less than 100 characters",
                            },
                        })}
                        {...(errors.description && {
                            className:
                                "text-sm w-full bg-gray-800/50 border-[1px] border-red-500/50 rounded-md px-3 py-2 mt-1 focus:outline-none",
                        })}
                    />
                    {errors.description && (
                        <p className="text-xs text-red-400 mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-x-2 mt-4">
                    <Button
                        type="submit"
                        disabled={false}
                        className="text-red-500 hover:text-red-400"
                    >
                        <EditIcon className="w-4 h-4" />
                        Edit link
                    </Button>

                    <Button type="button" onClick={close}>
                        <SignoutIcon className="w-4 h-4" />
                        Close
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
