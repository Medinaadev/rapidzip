"use client";
import Up from "@/components/motions/Up";
import Button from "@/components/ui/button";
import { useState } from "react";
import { nanoid } from "nanoid";
import RocketIcon from "@/components/icons/rocket";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreatedLinkModal } from "@/components/modals/createdLink";
import { trpc } from "@/app/_trpc/client";

type FormValues = {
    url: string;
    alias: string;
    description: string;
};

const CreateLinkForm = () => {
    const { open } = useCreatedLinkModal();
    const [toastId, setToastId] = useState<string | undefined>();
    const { mutate: createLink } = trpc.links.createLink.useMutation({
        onSuccess: (data) => {
            setLoading(false);
            setValue("url", "");
            setValue("alias", "");
            setValue("description", "");
            regenerate();
            open(`${window.location.origin}/q/${data.alias}`);
            toast.success("Link created!", {
                id: toastId,
            });
        },
        onError: (err) => {
            const errorMessage = `Alias "${alias}" already exists!`;

            setError("alias", {
                type: "manual",
                message: errorMessage,
            });
            setLoading(false);
            toast.error(errorMessage, {
                id: toastId,
            });
        },
    });
    const [loading, setLoading] = useState(false);
    const [defaultAlias, setDefaultAlias] = useState(nanoid(8));
    const [alias, setAlias] = useState(defaultAlias);
    const {
        handleSubmit,
        register,
        setValue,
        setError,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        const toastId = toast.loading("Creating link...");
        setToastId(toastId);

        createLink(data);
    };

    const regenerate = () => {
        const newAlias = nanoid(8);
        setDefaultAlias(newAlias);
        setAlias(newAlias);
        setValue("alias", newAlias);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Up delay={0.3}>
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
                        disabled={loading}
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
                                value: /^https?:\/\/\S*$/i,
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
            </Up>

            <Up delay={0.4} className="mt-4">
                <label
                    htmlFor="alias"
                    className="text-white/60 text-sm font-semibold"
                >
                    Custom alias (optional)
                </label>
                <div className="flex items-end gap-x-4 -mt-1">
                    <div className="flex items-center gap-x-1 text-sm w-full bg-gray-800/50 border-[1px] border-white/10 rounded-md px-3 py-2 mt-1">
                        <span className="max-sm:hidden text-white/60">
                            rapidzip.xyz/q/
                        </span>
                        <input
                            suppressHydrationWarning
                            type="text"
                            id="alias"
                            placeholder={defaultAlias}
                            maxLength={8}
                            value={alias}
                            disabled={loading}
                            className="w-full bg-transparent focus:outline-none"
                            {...register("alias", {
                                onChange: (e) => {
                                    setAlias(e.target.value);
                                },
                                required: {
                                    value: true,
                                    message: "Please enter an alias",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9_-]*$/i,
                                    message:
                                        "Please enter a valid alias without special characters",
                                },
                            })}
                            {...(errors.alias && {
                                className:
                                    "w-full bg-transparent focus:outline-none",
                            })}
                        />
                    </div>
                    <Button disabled={loading} onClick={() => regenerate()}>
                        Regenerate
                    </Button>
                </div>
                {errors.alias && (
                    <p className="text-xs text-red-400 mt-1">
                        {errors.alias.message}
                    </p>
                )}
            </Up>

            <Up delay={0.5} className="mt-4">
                <label
                    htmlFor="description"
                    className="text-white/60 text-sm font-semibold"
                >
                    Description (optional)
                </label>

                <textarea
                    id="description"
                    placeholder="Enter a description for your link"
                    rows={2}
                    disabled={loading}
                    className="text-sm w-full bg-gray-800/50 border-[1px] border-white/10 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-white/20"
                    {...register("description")}
                />
            </Up>

            <Up delay={0.6} className="mt-4">
                <Button type="submit" disabled={loading}>
                    <RocketIcon className="w-4 h-4" />
                    Shorten Link
                </Button>
            </Up>
        </form>
    );
};

export default CreateLinkForm;
