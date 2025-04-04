import React, { useRef, useState } from 'react';

// Define the type for the props
type InputProps = {
  onComplete: (pin: string) => void; // Callback function to be triggered when OTP is complete
};

const OTPInput = ({ onComplete }: InputProps) => {
  // Reference for the input elements
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  // State to hold the OTP digits
  const [OTP, setOTP] = useState<string[]>(Array(6).fill(''));

  // Function to handle the change in input value
  const handleTextChange = (input: string, index: number) => {
    // Create a new array to update the OTP value
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    // Automatically move to the next input field when a digit is entered
    if (input.length === 1 && index < 5) { // Fix: Changed 'length' to '5' to match the OTP length
      inputRef.current[index + 1]?.focus();
    }

    // Move to the previous input field if the user deletes a digit
    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    // If all OTP fields are filled, trigger the onComplete function with the OTP
    if (newPin.every((digit) => digit !== '')) {
      onComplete(newPin.join(''));
    }
  };

  return (
    <div className="flex gap-x-2 mt-6">
      {/* Render input fields dynamically based on the OTP length */}
      {Array.from({ length: 6 }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={OTP[index]}
          onChange={(e) => handleTextChange(e.target.value, index)} // Handle the text change for each input
          ref={(el: HTMLInputElement | null) => (inputRef.current[index] = el as any)} // Use RefCallback to assign the reference to each input element
          className="w-14 h-14 text-center text-xl border border-Greyscale-100 rounded-lg outline-none transition-all focus:border-Greyscale-900" 
          style={{ marginRight: index === 5 ? '0' : '10px' }} // Add margin-right except for the last input
        />
      ))}
    </div>
  );
};

export default OTPInput;