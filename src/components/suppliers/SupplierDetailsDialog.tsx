import { X } from "lucide-react";

import type { Supplier } from "@/types/suppliers";

interface Props{
open:boolean;
supplier:Supplier|null;
onClose:()=>void;
}

export default function SupplierDetailsDialog({
open,
supplier,
onClose,
}:Props){

if(!open||!supplier)return null;

return(

<>

<div
className="fixed inset-0 z-50 bg-black/50"
onClick={onClose}
/>

<div className="fixed left-1/2 top-1/2 z-[60] w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-[28px] bg-[color:var(--surface)] p-8">

<div className="mb-8 flex justify-between">

<h2 className="text-2xl font-bold">
Supplier Details
</h2>

<button onClick={onClose}>
<X/>
</button>

</div>

<div className="space-y-5">

<p><strong>Name:</strong> {supplier.name}</p>

<p><strong>Contact:</strong> {supplier.contact_person}</p>

<p><strong>Email:</strong> {supplier.email}</p>

<p><strong>Phone:</strong> {supplier.phone}</p>

<p><strong>Address:</strong> {supplier.address}</p>

<p><strong>City:</strong> {supplier.city}</p>

<p><strong>State:</strong> {supplier.state}</p>

<p><strong>Country:</strong> {supplier.country}</p>

<p><strong>Status:</strong> {supplier.is_active?"Active":"Inactive"}</p>

</div>

</div>

</>

);

}