"use client";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import SignoutIcon from "@/components/icons/signout";
import toast from "react-hot-toast";
import { Link } from "@prisma/client";
import WarnIcon from "../icons/warn";
import { useForm } from "react-hook-form";
import Button from "../ui/button";
import EditIcon from "../icons/edit";
import { trpc } from "@/app/_trpc/client";
import { Modal } from "./modal";
import DeleteIcon from "../icons/delete";

const context = createContext({
    isOpen: false,
    link: {} as Link,
    // onClose tiene que devolver un boolean
    open: (link: Link, onClose: (success?: any) => void) => {},
    close: (isSuccess?: boolean) => {},
});

export const useDeleteLinkModal = () => useContext(context);

export const DeleteLinkModalProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [link, setLink] = useState<Link>({} as Link);
    const ref = useRef<(success?: boolean) => void>(() => {});

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
            <DeleteLinkModal />
            {children}
        </context.Provider>
    );
};

type FormValues = {
    confirm: string;
};

export const DeleteLinkModal = () => {
    const { isOpen, link, close } = useDeleteLinkModal();
    const [toastId, setToastId] = useState<string | undefined>();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>();
    const { mutate: deleteLink } = trpc.links.deleteLink.useMutation({
        onSuccess: () => {
            toast.success("Link deleted!", {
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

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        if (!isOpen) {
            setValue("confirm", "");
        }
    }, [isOpen, setValue]);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                close();
            }
        };

        const handleClick = (e: any) => {
            if (e.target.classList.contains("fixed")) {
                close();
            }
        };

        window.addEventListener("keydown", handleKeydown);
        window.addEventListener("mousedown", handleClick);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
            window.removeEventListener("mousedown", handleClick);
        };
    }, [close]);

    const onSubmit = (data: FormValues) => {
        const toastId = toast.loading("Deleting link...");
        setToastId(toastId);

        deleteLink(link.id);
    };

    return (
        <Modal isOpen={isOpen}>
            <h1 className="text-white text-lg font-semibold">
                Delete link <span className="text-gray-400">/{link.alias}</span>{" "}
                ?
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
                        Enter this{" "}
                        <span className="text-white">{link.alias}</span> to
                        confirm
                    </label>
                    <input
                        type="text"
                        id="link"
                        placeholder="To confirm..."
                        className="text-sm w-full bg-gray-800/50 border-[1px] border-white/10 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-white/20"
                        {...register("confirm", {
                            required: {
                                value: true,
                                message: "Please enter the alias to confirm",
                            },
                            pattern: {
                                // tiene que empezar con https:// aqui tiene que haber algo y luego un punto y luego algo
                                value: new RegExp(
                                    // que sea el alias y que termine
                                    `^${link.alias}$`
                                ),
                                message: "Please enter the correct alias",
                            },
                        })}
                        {...(errors.confirm && {
                            className:
                                "text-sm w-full bg-gray-800/50 border-[1px] border-red-500/50 rounded-md px-3 py-2 mt-1 focus:outline-none",
                        })}
                    />
                    {errors.confirm && (
                        <p className="text-xs text-red-400 mt-1">
                            {errors.confirm.message}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-x-2 mt-4">
                    <Button
                        type="submit"
                        disabled={false}
                        className="text-red-500 hover:text-red-400"
                    >
                        <DeleteIcon className="w-3.5 h-3.5" />
                        Delete link
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
