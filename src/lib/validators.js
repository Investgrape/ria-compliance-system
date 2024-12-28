import { z } from 'zod';

export const agreementSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  email: z.string().email('Invalid email address'),
  accountType: z.enum(['individual', 'joint', 'ira', 'roth', 'trust']),
  feeAmount: z.string().regex(/^\d*\.?\d+$/, 'Invalid fee amount'),
  isRollover: z.boolean()
});

export const employeeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  startDate: z.string(),
  licenses: z.array(z.string()),
  certifications: z.array(z.string())
});

export const validateAgreement = (data) => {
  try {
    return { data: agreementSchema.parse(data), error: null };
  } catch (error) {
    return { data: null, error: error.errors };
  }
};

export const validateEmployee = (data) => {
  try {
    return { data: employeeSchema.parse(data), error: null };
  } catch (error) {
    return { data: null, error: error.errors };
  }
};