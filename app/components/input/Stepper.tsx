import React from 'react';
import { CheckIcon } from 'lucide-react';

export interface Step {
  id: string;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick
}) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <div
              className={`flex items-center justify-center relative ${
                onStepClick ? 'cursor-pointer' : ''
              }`}
              onClick={() => {
                if (onStepClick && index < currentStep) {
                  onStepClick(index);
                }
              }}
            >
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${
                    index < currentStep 
                      ? 'bg-theme-primary-600 dark:bg-theme-primary-700 text-white' 
                      : index === currentStep 
                        ? 'bg-theme-primary-600 dark:bg-theme-primary-700 text-white ring-4 ring-theme-primary-100 dark:ring-theme-primary-800' 
                        : 'bg-theme-gray-200 dark:bg-theme-gray-700 text-theme-gray-600 dark:text-theme-gray-300'
                  }
                `}
              >
                {index < currentStep ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>

              {/* Step Title */}
              <div className="absolute top-12 w-32 text-center">
                <p
                  className={`
                    text-sm font-medium
                    ${
                      index <= currentStep 
                        ? 'text-theme-primary-600 dark:text-theme-primary-400' 
                        : 'text-theme-gray-500 dark:text-theme-gray-400'
                    }
                  `}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-theme-gray-500 dark:text-theme-gray-400 mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  w-24 h-1 mx-1
                  ${
                    index < currentStep 
                      ? 'bg-theme-primary-600 dark:bg-theme-primary-700' 
                      : 'bg-theme-gray-200 dark:bg-theme-gray-700'
                  }
                `}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;