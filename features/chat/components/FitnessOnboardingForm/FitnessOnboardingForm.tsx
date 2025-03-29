import React, { useState } from 'react';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FitnessOnboardingFormProps } from "../../types/fitnessOnBoardingType";
import { INITIAL_ON_BOARDING_FORM_DATA } from "../../constants/fitnessOnBoarding";
import { Check, ArrowRight, ArrowLeft, ThumbsUp } from "lucide-react";

const FitnessOnboardingForm = ({ onSubmit }: FitnessOnboardingFormProps) => {
    const [formData, setFormData] = useState(INITIAL_ON_BOARDING_FORM_DATA);
    const [step, setStep] = useState<'name' | 'details' | 'overview'>('name');

    const handlePersonalInfoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            formData.name.trim() &&
            formData.age.trim() &&
            formData.gender.trim() &&
            formData.weight.trim()
        ) {
            setStep("details");
        } else {
            alert("Please fill out all personal information fields");
        }
    };

    const handleDetailsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validate all fields are filled
        console.log(formData);
        const isComplete = Object.values(formData).every(value => value.trim() !== '');

        if (isComplete) {
            setStep("overview");
        } else {
            alert('Please fill out all fields');
        }
    };

    const handleFinalSubmit = () => {
        // Format the data as a clear message for the AI
        const formattedData = {
            ...formData,
            message: `Hi, I'm ${formData.name}, and I'm ${formData.age} years old. I am a ${formData.gender} and weight ${formData.weight} kg. My fitness level is ${formData.fitnessLevel}, and my goal is ${formData.fitnessGoal}. ${
                formData.healthAndPhysicalCapacity
                    ? `I have the following physical limitations: ${formData.healthAndPhysicalCapacity}.`
                    : "I have no physical limitations."
            } I prefer working out at ${
                formData.workoutAccess === "home" ? "home" : "the gym"
            }.`,
        };

        onSubmit(formattedData);
    };

    // Navigation handlers
    const goToPersonalInfo = () => setStep('name');
    const goToDetails = () => setStep('details');

    // Stepper component
    const Stepper = () => (
        <div className="flex items-center justify-center mb-6">
            <div className="flex items-center w-full max-w-md">
                {/* Step 1 */}
                <div className="relative flex flex-col items-center">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                        step === 'name'
                            ? 'bg-primary border-primary text-white'
                            : 'bg-primary border-primary text-white'
                    }`}>
                        {step === 'name' ? "1" : <Check className="w-6 h-6" />}
                    </div>
                    <span className="text-xs mt-1">Personal Info</span>
                </div>

                {/* Connector 1 */}
                <div className={`flex-1 h-1 mx-2 ${
                    step === 'name' ? 'bg-gray-300' : 'bg-primary'
                }`}></div>

                {/* Step 2 */}
                <div className="relative flex flex-col items-center">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                        step === 'details'
                            ? 'bg-primary border-primary text-white'
                            : step === 'overview'
                                ? 'bg-primary border-primary text-white'
                                : 'bg-gray-200 border-gray-300 text-gray-600'
                    }`}>
                        {step === 'overview' ? <Check className="w-6 h-6" /> : "2"}
                    </div>
                    <span className="text-xs mt-1">Fitness Profile</span>
                </div>

                {/* Connector 2 */}
                <div className={`flex-1 h-1 mx-2 ${
                    step === 'overview' ? 'bg-primary' : 'bg-gray-300'
                }`}></div>

                {/* Step 3 */}
                <div className="relative flex flex-col items-center">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                        step === 'overview'
                            ? 'bg-primary border-primary text-white'
                            : 'bg-gray-200 border-gray-300 text-gray-600'
                    }`}>
                        3
                    </div>
                    <span className="text-xs mt-1">Overview</span>
                </div>
            </div>
        </div>
    );

    const renderPersonalInfoStep = () => (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <Stepper />
                <CardTitle>Welcome! Tell us about yourself.</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Your Name</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Your Age</Label>
                        <Input
                            type="number"
                            value={formData.age}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    age: e.target.value,
                                }))
                            }
                            placeholder="Enter your age"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Your Gender</Label>
                        <Select
                            value={formData.gender}
                            onValueChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    gender: value,
                                }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Your Weight (kg)</Label>
                        <Input
                            type="number"
                            value={formData.weight}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    weight: e.target.value,
                                }))
                            }
                            placeholder="Enter your weight in kg"
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );

    const renderDetailsStep = () => (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <Stepper />
                <CardTitle>Hello, {formData.name}! Let&#39;s create your fitness profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleDetailsSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Fitness Level</Label>
                        <Select
                            value={formData.fitnessLevel}
                            onValueChange={(value) => setFormData(prev => ({
                                ...prev,
                                fitnessLevel: value
                            }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select your fitness level" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Fitness Goal</Label>
                        <Select
                            value={formData.fitnessGoal}
                            onValueChange={(value) => setFormData(prev => ({
                                ...prev,
                                fitnessGoal: value
                            }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select your fitness goal" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Building Muscle">Building Muscle</SelectItem>
                                <SelectItem value="Losing Fat">Losing Fat</SelectItem>
                                <SelectItem value="Improve endurance">Improve Endurance</SelectItem>
                                <SelectItem value="General Fitness">General Fitness</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Physical Limitations</Label>
                        <Input
                            value={formData.healthAndPhysicalCapacity}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                healthAndPhysicalCapacity: e.target.value
                            }))}
                            placeholder="Any injuries or limitations?"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Workout Preference</Label>
                        <Select
                            value={formData.workoutAccess}
                            onValueChange={(value) => setFormData(prev => ({
                                ...prev,
                                workoutAccess: value
                            }))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Where do you prefer to workout?" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="home">Home</SelectItem>
                                <SelectItem value="gym">Gym</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Button type="button" className="flex-1" variant="outline" onClick={goToPersonalInfo}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                        <Button type="submit" className="flex-1">
                            Review <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );

    const renderOverviewStep = () => {
        const genderDisplay = {
            'male': 'Male',
            'female': 'Female',
            'other': 'Other'
        }[formData.gender] || formData.gender;

        const fitnessLevelDisplay = {
            'beginner': 'Beginner',
            'intermediate': 'Intermediate',
            'advanced': 'Advanced'
        }[formData.fitnessLevel] || formData.fitnessLevel;

        const workoutAccessDisplay = {
            'home': 'Home',
            'gym': 'Gym'
        }[formData.workoutAccess] || formData.workoutAccess;

        return (
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <Stepper />
                    <CardTitle>Review Your Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium text-gray-900 mb-2">Personal Information</h3>
                            <dl className="grid grid-cols-2 gap-2">
                                <dt className="text-sm text-gray-600">Name:</dt>
                                <dd className="text-sm font-medium">{formData.name}</dd>

                                <dt className="text-sm text-gray-600">Age:</dt>
                                <dd className="text-sm font-medium">{formData.age}</dd>

                                <dt className="text-sm text-gray-600">Gender:</dt>
                                <dd className="text-sm font-medium">{genderDisplay}</dd>

                                <dt className="text-sm text-gray-600">Weight:</dt>
                                <dd className="text-sm font-medium">{formData.weight} kg</dd>
                            </dl>
                            <Button
                                type="button"
                                variant="ghost"
                                className="mt-2 h-auto p-0 text-primary text-sm"
                                onClick={goToPersonalInfo}
                            >
                                Edit Personal Information
                            </Button>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium text-gray-900 mb-2">Fitness Profile</h3>
                            <dl className="grid grid-cols-2 gap-2">
                                <dt className="text-sm text-gray-600">Fitness Level:</dt>
                                <dd className="text-sm font-medium">{fitnessLevelDisplay}</dd>

                                <dt className="text-sm text-gray-600">Fitness Goal:</dt>
                                <dd className="text-sm font-medium">{formData.fitnessGoal}</dd>

                                <dt className="text-sm text-gray-600">Physical Limitations:</dt>
                                <dd className="text-sm font-medium">
                                    {formData.healthAndPhysicalCapacity || "None specified"}
                                </dd>

                                <dt className="text-sm text-gray-600">Workout Preference:</dt>
                                <dd className="text-sm font-medium">{workoutAccessDisplay}</dd>
                            </dl>
                            <Button
                                type="button"
                                variant="ghost"
                                className="mt-2 h-auto p-0 text-primary text-sm"
                                onClick={goToDetails}
                            >
                                Edit Fitness Profile
                            </Button>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <Button type="button" className="flex-1" variant="outline" onClick={goToDetails}>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back
                            </Button>
                            <Button
                                type="button"
                                className="flex-1 bg-green-600 hover:bg-green-700"
                                onClick={handleFinalSubmit}
                            >
                                Confirm <ThumbsUp className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    if (step === 'name') return renderPersonalInfoStep();
    if (step === 'details') return renderDetailsStep();
    return renderOverviewStep();
};

export default FitnessOnboardingForm;
