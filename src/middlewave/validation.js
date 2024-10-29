export const validation = (schema)=>{
    return (req,res,next)=>{
        let filterData = {};
        if(req.file){
            filterData = {image:req.file,...req.body,...req.params,...req.query};
        }
        else if(req.files){
            filterData = {...req.files,...req.body,...req.params,...req.query};
        }
        else{
            filterData = {...req.body,...req.params,...req.query};
        }
        const {error} =schema.validate(filterData,{abortEarly:false});
        let errorMessage = [];
        if(error){
            error.details.map(err => {
                const key = err.context.key;
                errorMessage.push({[key]:err.message})});
                return res.status(400).json({message:errorMessage});
            }            
        next();
    }
}
