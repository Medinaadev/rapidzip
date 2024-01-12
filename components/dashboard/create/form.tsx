"use client";
import Up from "@/components/motions/Up";
import Button from "@/components/ui/button";
import { useState } from "react";
import { nanoid } from "nanoid";
import RocketIcon from "@/components/icons/rocket";
import { createLink } from "@/lib/createLink";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreatedLinkModal } from "@/components/modals/createdLink";
import { trpc } from "@/lib/trpc";

type FormValues = {
    url: string;
    alias: string;
    description: string;
};

const CreateLinkForm = ({ userId }: { userId: string }) => {
    // const mutation = trpc.links.createLink.useMutation();
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
    const { open } = useCreatedLinkModal();

    const onSubmit = async (data: FormValues) => {
        // setLoading(true);
        const hello = await trpc.greeting.query();
        console.log(hello.data);
        // const promise = new Promise((resolve, reject) => {
        //     trpc.links.createLink
        //         .mutate({
        //             ...data,
        //         })
        //         .then(() => {
        //             resolve("success");
        //         })
        //         .catch(() => {
        //             reject();
        //         });
        //     // createLink({
        //     //     ...data,
        //     //     userId,
        //     // })
        //     //     .then((res) => {
        //     //         if (res instanceof Error) {
        //     //             reject(res);
        //     //         } else if (typeof res === "string") {
        //     //             reject(new Error(res));
        //     //         }
        //     //         resolve(res);
        //     //     })
        //     //     .catch((err) => {
        //     //         reject(err);
        //     //     });
        // });
        // toast.promise(promise, {
        //     loading: "Creating link...",
        //     success: (data: any) => {
        //         setLoading(false);
        //         setValue("url", "");
        //         setValue("alias", "");
        //         setValue("description", "");
        //         regenerate();
        //         // open(window.location.origin + "/q/" + data.alias);
        //         return "Link created!";
        //     },
        //     error: (err) => {
        //         setError("alias", {
        //             type: "manual",
        //             message: err.message,
        //         });
        //         setLoading(false);
        //         return err.message;
        //     },
        // });
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
                                value: /^https:\/\/.*/i,
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
