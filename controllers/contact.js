import { Contact } from '../models/contact.js'


export const getAllContact = async (req, res) => {
    const id = req.params.id;
  const userContact = await Contact.find();

  if (!userContact)
    return res.json({ message: "No Contact Exist", success: false });

  res.json({ message: "All Contact Fatched", userContact });
};
   

export const newContact = async (req, res) => {
const id = req.params.id;
  const { name, email, phone, type } = req.body;

  if (name == "" || email == "" || phone == "" || type == "")
    return res.json({ message: "All feilds are required", success: false });

  let saveContact = await Contact.create({
    name,
    email,
    phone,
    type,
    user:req.user
  });

  //res.status(201).json({
   res.json({ message: "Contact saved successfully...!",saveContact,success: true  });
};

export const updateContactById = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;

  let updatedContact = await Contact.findByIdAndUpdate(
    id,
    {
      name,
      email,
      phone,
      type,
    },
    { new: true }
  )
  if (!updatedContact)
    return res.json({ message: "No Contact exist", success: false });

  res.json({
    message: "Contact updated Successfully...!",
    updatedContact,
    success: true,
  });
};
//delete contact by id
export const deleteContactById = async (req, res) => {
  const id = req.params.id;

  let deleteContact = await Contact.findByIdAndDelete(id);

  if (!deleteContact)
    return res.json({ message: "No Contact exist", success: false });

  res.json({
    message: "Contact deleted Successfully...!",
    success: true,
  });
};


