import Ajv from "ajv";

const ajv = new Ajv();

const userSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    age: { type: "integer", minimum: 10 },
    address: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["name", "email", "password", "id"],
};

export default ajv.compile(userSchema);
