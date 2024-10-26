import { validate } from "class-validator";
import { useState } from "react";
import { User } from "../../models/user.model";

interface Props {
      handleUserAdd: (user: User) => void;
}

export const useForm = ({ handleUserAdd }: Props) => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            const user = new User(name.trim(), email.trim());
            const validations = await validate(user);
            if (validations.length > 0) {
                  let errorString = 'Please fix the following errors:\n\n';
                  for (const validation of validations) {
                        for (const key in validation.constraints) {
                              errorString += validation.constraints[key] + '\n';
                        }
                        errorString += '\n';
                  }
                  alert(errorString);
                  return;
            }
            handleUserAdd(user);
            clearInputs();
      };

      const clearInputs = () => {
            setName('');
            setEmail('');
      };

      return {
            name,
            setName,
            email,
            setEmail,
            handleSubmit,
      }
}