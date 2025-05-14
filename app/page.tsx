"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ModeToggle } from "@/components/modetoggle";
import { Copy, Github } from "lucide-react";

export default function Home() {
  const [mode, setMode] = useState("random");

  const [randomLength, setRandomLength] = useState(12);
  const [randomSpecial, setRandomSpecial] = useState(true);
  const [randomNums, setRandomNums] = useState(true);
  const [randomUppercase, setRandomUppercase] = useState(true);

  const [readableLength, setReadableLength] = useState(4);
  const [readableNumCount, setReadableNumCount] = useState(2);

  const [passphraseLength, setPassphraseLength] = useState(4);
  const [passphraseDelimeter, setPassphraseDelimeter] = useState("-");
  const [passphraseCapitalize, setPassphraseCapitalize] = useState(true);

  const [template, setTemplate] = useState("Cvcvcv##");

  const [password, setPassword] = useState("");

  const fetchPassword = async () => {
    let url = "";
    switch (mode) {
      case "random":
        url = `https://nextpass.onrender.com/generate/random?length=${randomLength}&special=${randomSpecial}&nums=${randomNums}&uppercase=${randomUppercase}`;
        break;
      case "readable":
        url = `https://nextpass.onrender.com/generate/readable?length=${readableLength}&nums=${readableNumCount}`;
        break;
      case "passphrase":
        url = `https://nextpass.onrender.com/generate/passphrase?length=${passphraseLength}&capitalize=${passphraseCapitalize}&delimeter=${passphraseDelimeter}`;
        break;
      case "template":
        url = `https://nextpass.onrender.com/generate/template?tmpl=${template}`;
        break;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("cannot fetch password");
      }
      const data = await response.json();
      setPassword(data.password);
    } catch (error) {
      toast("Oops!", {
        description: `${error}`,
      });
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    toast("Password copied", {
      description: "Password successfully copied to clipboard",
    });
  };

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    setPassword("");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4 sm:max-w-full sm:p-4">
      <span className="flex items-center justify-between">
        <h1 className="font-bold text-xl">NextPass</h1>
        <span className="space-x-2">
          <ModeToggle />
          <Button variant="outline" size="icon" asChild>
            <Link href="https://github.com/witttccchhher/nextpass">
              <Github />
            </Link>
          </Button>
        </span>
      </span>

      <Pagination>
        <PaginationContent>
          {["random", "readable", "passphrase", "template"].map((m) => (
            <PaginationItem key={m}>
              <PaginationLink
                isActive={mode === m}
                onClick={() => handleModeChange(m)}
                className="min-w-fit px-2 capitalize"
              >
                {m}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>

      <Card className="mx-auto max-w-fit">
        <CardContent className="space-y-4">
          {mode === "random" && (
            <>
              <span className="flex space-x-4 items-center">
                <label className="font-medium">Length:</label>
                <Input
                  type="number"
                  min={4}
                  max={128}
                  value={randomLength}
                  onChange={(e) => setRandomLength(Number(e.target.value))}
                />
              </span>
              <span className="flex items-center justify-between">
                <span>Special symbols</span>
                <Switch
                  checked={randomSpecial}
                  onCheckedChange={setRandomSpecial}
                />
              </span>
              <span className="flex items-center justify-between">
                <span>Numbers</span>
                <Switch checked={randomNums} onCheckedChange={setRandomNums} />
              </span>
              <span className="flex items-center justify-between">
                <span>Capital letters</span>
                <Switch
                  checked={randomUppercase}
                  onCheckedChange={setRandomUppercase}
                />
              </span>
            </>
          )}

          {mode === "readable" && (
            <>
              <span className="flex space-x-4 items-center">
                <label className="font-medium">Length:</label>
                <Input
                  type="number"
                  min={4}
                  max={128}
                  value={readableLength}
                  onChange={(e) => setReadableLength(Number(e.target.value))}
                />
              </span>
              <span className="flex space-x-4 items-center">
                <label className="font-medium text-nowrap">
                  Trailing numbers:
                </label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={readableNumCount}
                  onChange={(e) => setReadableNumCount(Number(e.target.value))}
                />
              </span>
            </>
          )}

          {mode === "passphrase" && (
            <>
              <span className="flex space-x-4 items-center">
                <label className="font-medium">Count words:</label>
                <Input
                  type="number"
                  min={2}
                  max={20}
                  value={passphraseLength}
                  onChange={(e) => setPassphraseLength(Number(e.target.value))}
                />
              </span>
              <span className="flex space-x-4 items-center">
                <label className="font-medium">Delimiter:</label>
                <Input
                  type="text"
                  value={passphraseDelimeter}
                  onChange={(e) => setPassphraseDelimeter(e.target.value)}
                />
              </span>
              <span className="flex items-center justify-between">
                <span>Capitalize words</span>
                <Switch
                  checked={passphraseCapitalize}
                  onCheckedChange={setPassphraseCapitalize}
                />
              </span>
            </>
          )}

          {mode === "template" && (
            <>
              <span className="flex space-x-4 items-center">
                <label className="font-medium">Template:</label>
                <Input
                  type="text"
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                />
              </span>
            </>
          )}

          <Button onClick={fetchPassword}>Generate password</Button>
          <div className="flex space-x-2 items-center">
            <Input readOnly value={password ?? ""} />
            <Button onClick={handleCopy} variant="outline" size="icon">
              <Copy />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
