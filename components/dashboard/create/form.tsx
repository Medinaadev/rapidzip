"use client";
import Up from "@/components/motions/Up";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import RocketIcon from "@/components/icons/rocket";
import { createLink } from "@/lib/createLink";
import { useForm } from "react-hook-form";

type FormValues = {
    link: string;
    alias: string;
    description: string;
};

const createLinkForm = () => {
    const [defaultAlias, setDefaultAlias] = useState(nanoid(6));
    const [alias, setAlias] = useState(defaultAlias);
    const {
        handleSubmit,
        register,
        setValue,
        setError,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.log(data);
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
                        className="text-sm w-full bg-gray-800/50 border-[1px] border-white/10 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-white/20"
                        {...register("link", {
                            required: {
                                value: true,
                                message: "Please enter a link",
                            },
                        })}
                        // {
                        //     errors.link && (
                        //         <span className="text-red-500 text-sm">
                        //             {errors.link.message}
                        //         </span>
                        //     )
                        // }
                    />
                </div>
            </Up>

            <Up delay={0.4} className="mt-4">
                <label
                    htmlFor="link"
                    className="text-white/60 text-sm font-semibold"
                >
                    Custom alias (optional)
                </label>
                <p className="hidden max-sm:block text-white/60 text-sm mt-1">
                    rapidzip.vercel.app/link/...
                </p>
                <div className="flex items-end gap-x-4 -mt-1">
                    <div className="flex items-center gap-x-1 text-sm w-full bg-gray-800/50 border-[1px] border-white/10 rounded-md px-3 py-2 mt-1">
                        <span className="max-sm:hidden text-white/60">
                            rapidzip.vercel.app/link/
                        </span>
                        <input
                            type="text"
                            id="link"
                            placeholder={defaultAlias}
                            maxLength={6}
                            value={alias}
                            className="w-full bg-transparent focus:outline-none"
                            onChange={(e) => {
                                setAlias(e.target.value);
                            }}
                        />
                    </div>
                    <Button
                        onClick={() => {
                            const newAlias = nanoid(6);
                            setDefaultAlias(newAlias);
                            setAlias(newAlias);
                        }}
                    >
                        Regenerate
                    </Button>
                </div>
            </Up>

            <Up delay={0.5} className="mt-4">
                {/* description */}
                <label
                    htmlFor="link"
                    className="text-white/60 text-sm font-semibold"
                >
                    Description (optional)
                </label>

                <textarea
                    id="link"
                    placeholder="Enter a description for your link"
                    rows={2}
                    className="text-sm w-full bg-gray-800/50 border-[1px] border-white/10 rounded-md px-3 py-2 mt-1 focus:outline-none focus:border-white/20"
                />
            </Up>

            <Up delay={0.6} className="mt-4">
                <Button>
                    <RocketIcon className="w-4 h-4" />
                    Shorten Link
                </Button>
            </Up>
        </form>
    );
};

export default createLinkForm;