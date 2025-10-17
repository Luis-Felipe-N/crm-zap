"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, QrCode, ServerCrash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  type CreateInstanceData,
  createInstanceSchema,
} from "@/lib/schemas/instance";

export default function CreateInstanceDialog() {
  const [open, setOpen] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const form = useForm<CreateInstanceData>({
    resolver: zodResolver(createInstanceSchema),
    defaultValues: {
      instanceName: "",
      phoneNumber: "",
    },
  });

  const { mutate, isPending, isError, reset } = useMutation({
    mutationKey: ["create-instance"],
    mutationFn: async (data: CreateInstanceData) => {
      const response = await fetch("/api/instances", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Falha ao criar instância.");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      setQrCode(data.qrcode);
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
    },
  });

  const onSubmit = (data: CreateInstanceData) => {
    mutate(data);
  };

  const handleReset = () => {
    setQrCode(null);
    form.reset();
    if (isError) {
      reset();
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      // Reset state when dialog is closed
      handleReset();
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Criar instância</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          if (isPending) {
            e.preventDefault();
          }
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <QrCode className="size-5" />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              {qrCode ? "Escaneie o QR Code" : "Criar Instância WhatsApp"}
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              {qrCode
                ? "Abra seu WhatsApp e escaneie o código para conectar."
                : "Informe os dados para iniciar uma instância."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {isError ? (
          <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
            <ServerCrash className="size-12 text-destructive" />
            <p className="text-destructive-foreground">
              Ocorreu um erro ao criar a instância.
            </p>
            <p className="text-sm text-muted-foreground">
              Por favor, tente novamente mais tarde.
            </p>
            <Button onClick={handleReset}>Tentar Novamente</Button>
          </div>
        ) : qrCode ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src={`data:image/png;base64,${qrCode}`}
              alt="QR Code do WhatsApp"
              width={250}
              height={250}
              className="rounded-lg"
            />
            <Button variant="outline" onClick={handleReset}>
              Criar outra instância
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="instanceName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Instância</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Atendimento Vendas"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número (Telefone)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+55 63 98765-4321"
                          type="tel"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                {isPending ? "Criando..." : "Criar Instância e Gerar QR Code"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
