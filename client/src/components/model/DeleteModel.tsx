import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";

interface DeleteModelProps {
    isDelete : boolean;
    handleDeleteModel:()=>void;
    onDelete:()=>void;
}
const DeleteModel = ({ isDelete,handleDeleteModel,onDelete}: DeleteModelProps)=>{
    return(
        <Dialog open={isDelete} onOpenChange={handleDeleteModel}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                </DialogHeader>
                <div className="grid gap-2 py-2">
                    <Label>Are you sure you want to delete account</Label>
                </div>
                <DialogFooter>
                    <Button onClick={handleDeleteModel}>No,Cancel</Button>
                    <Button variant={'destructive'} onClick={onDelete}>Yes, I'm sure</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteModel;