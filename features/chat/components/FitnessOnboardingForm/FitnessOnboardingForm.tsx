import React, { useState } from 'react';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FitnessOnboardingFormProps } from "../../types/fitnessOnBoardingType";

const FitnessOnboardingForm = ({ onSubmit }: FitnessOnboardingFormProps) => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        weight: "",
        fitnessLevel: "",
        fitnessGoal: "",
        healthAndPhysicalCapacity: "",
        workoutAccess: "",
    });

    const [step, setStep] = useState<'name' | 'details'>('name');

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
        const isComplete = Object.values(formData).slice(1).every(value => value.trim() !== '');

        if (isComplete) {
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
        } else {
            alert('Please fill out all fields');
        }
    };

    const renderPersonalInfoStep = () => (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
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
                        Next
                    </Button>
                </form>
            </CardContent>
        </Card>
    );

    const renderDetailsStep = () => (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
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

                    <Button type="submit" className="w-full">
                        Create Fitness Profile
                    </Button>
                </form>
            </CardContent>
        </Card>
    );

    return step === 'name'
        ? renderPersonalInfoStep()
        : renderDetailsStep();
};

export default FitnessOnboardingForm;
