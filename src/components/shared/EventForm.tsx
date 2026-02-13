"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { useUploadThing } from "@/lib/uploadthing";

type EventFormProps = {
    userId: string;
    type: "Create" | "Update";
    event?: any;
    eventId?: string;
};

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const initialValues = event && type === "Update" ? {
        ...event,
        currency: event.currency || 'INR',
        startDateTime: new Date(event.startDateTime),
        endDateTime: new Date(event.endDateTime),
    } : eventDefaultValues;

    const router = useRouter();
    const { startUpload } = useUploadThing("imageUploader");

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues as z.infer<typeof eventFormSchema>,
    });

    async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        let uploadedImageUrl = values.imageUrl;

        if (files.length > 0) {
            const uploadedImages = await startUpload(files);

            if (!uploadedImages) return;

            uploadedImageUrl = uploadedImages[0].url;
        }

        if (type === "Create") {
            try {
                const newEvent = await createEvent({
                    event: { ...values, imageUrl: uploadedImageUrl },
                    userId,
                    path: "/profile",
                });

                if (newEvent) {
                    form.reset();
                    router.push(`/events/${newEvent.id}`);
                }
            } catch (error) {
                console.log(error);
            }
        }

        if (type === "Update") {
            if (!eventId) {
                router.back();
                return;
            }

            try {
                const updatedEvent = await updateEvent({
                    userId,
                    event: { ...values, imageUrl: uploadedImageUrl, id: eventId },
                    path: `/events/${eventId}`,
                });

                if (updatedEvent) {
                    form.reset();
                    router.push(`/events/${updatedEvent.id}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        placeholder="Event title"
                                        {...field}
                                        className="input-field"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Dropdown
                                        onChangeHandler={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <Textarea
                                        placeholder="Description"
                                        {...field}
                                        className="textarea rounded-2xl"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-72">
                                    <FileUploader
                                        onFieldChange={field.onChange}
                                        imageUrl={field.value}
                                        setFiles={setFiles}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 border border-white/10">
                                        <Input
                                            placeholder="Event location or Online"
                                            {...field}
                                            className="input-field border-0 bg-transparent focus:ring-0"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="startDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 border border-white/10">
                                        <p className="ml-3 whitespace-nowrap text-grey-600">
                                            Start Date:
                                        </p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date | null) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="datePicker"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDateTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 border border-white/10">
                                        <p className="ml-3 whitespace-nowrap text-grey-600">
                                            End Date:
                                        </p>
                                        <DatePicker
                                            selected={field.value}
                                            onChange={(date: Date | null) => field.onChange(date)}
                                            showTimeSelect
                                            timeInputLabel="Time:"
                                            dateFormat="MM/dd/yyyy h:mm aa"
                                            wrapperClassName="datePicker"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 border border-white/10">
                                        <Input
                                            type="number"
                                            placeholder="Price"
                                            {...field}
                                            className="p-regular-16 border-0 bg-transparent outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        />

                                        <FormField
                                            control={form.control}
                                            name="currency"
                                            render={({ field: currencyField }) => (
                                                <FormItem>
                                                    <Select onValueChange={currencyField.onChange} defaultValue={currencyField.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-[80px] border-0 bg-transparent focus:ring-0">
                                                                <SelectValue placeholder="INR" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="bg-white">
                                                            <SelectItem value="INR">₹ INR</SelectItem>
                                                            <SelectItem value="USD">$ USD</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />

                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="text-xs text-primary hover:bg-primary/10 mr-2"
                                            onClick={() => {
                                                const currentPrice = parseFloat(form.getValues('price'));
                                                const currentCurrency = form.getValues('currency');
                                                if (isNaN(currentPrice)) return;

                                                if (currentCurrency === 'INR') {
                                                    form.setValue('price', (currentPrice / 83).toFixed(2));
                                                    form.setValue('currency', 'USD');
                                                } else {
                                                    form.setValue('price', (currentPrice * 83).toFixed(0));
                                                    form.setValue('currency', 'INR');
                                                }
                                            }}
                                        >
                                            Convert
                                        </Button>

                                        <FormField
                                            control={form.control}
                                            name="isFree"
                                            render={({ field: freeField }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex items-center">
                                                            <label
                                                                htmlFor="isFree"
                                                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                Free Ticket
                                                            </label>
                                                            <Checkbox
                                                                onCheckedChange={freeField.onChange}
                                                                checked={freeField.value}
                                                                id="isFree"
                                                                className="mr-2 h-5 w-5 border-2 border-primary-500"
                                                            />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 border border-white/10">
                                        <Input
                                            placeholder="URL"
                                            {...field}
                                            className="input-field border-0 bg-transparent focus:ring-0"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="button col-span-2 w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 text-lg"
                >
                    {form.formState.isSubmitting ? "Submitting..." : `${type} Event `}
                </Button>
            </form>
        </Form>
    );
};

export default EventForm;
