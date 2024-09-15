"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { sendMessage } from "@/action/sendMessage";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const formSchema = z.object({
  content: z.string().min(1),
});

const SendMessage = (id: { sessionId: string; chatId: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    sendMessage(values, id.sessionId, id.chatId).then(() => form.reset());
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center"
      >
        <div className="grow">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem
                className="
              bg-gray-300 rounded-sm"
              >
                <FormControl>
                  <Input type="text" {...field} className="h-auto" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          variant="ghost"
          type="submit"
          className="hover:bg-black hover:bg-opacity-20"
        >
          <Image src="/images/send.svg" alt="send" width={25} height={25} />
        </Button>
      </form>
    </Form>
  );
};

export default SendMessage;
