import React, { useRef, useState } from 'react';
import {toast} from 'react-hot-toast';
import { VscWorkspaceTrusted } from 'react-icons/vsc';

type Props = {
    setRoute: (route: string) => void;
}

type VerifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
    "4": string;
}

const Verification = (props: Props) => {
    const [invalidError, setInvalidError] = useState<boolean>(false);
    const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
        "0": "",
        "1": "",
        "2": "",
        "3": "",
        "4": ""
    })
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ]

    const verificationHandler = async () => {
        console.log("Verification Handler..")
    }


    const handleInputChange = (index: number, value: string) => {
        setInvalidError(false)
        const newVerifyNumber = {...verifyNumber, [index]: value}
    }
  return (
    <div>Verification</div>
  )
}

export default Verification