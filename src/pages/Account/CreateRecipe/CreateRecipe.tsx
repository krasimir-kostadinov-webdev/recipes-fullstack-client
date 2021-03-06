import { Container, Typography, Paper } from "@mui/material";
import AddRecipeForm from "../../../components/AddRecipeForm/AddRecipeForm";

interface Props {}

const CreateRecipe = (props: Props) => {
   return (
      <Container>
         <Paper
            sx={{
               maxWidth: 600,
               padding: 3,
               margin: "auto",
            }}
         >
            <Typography variant="h5" mb={3} gutterBottom>
               Create a new recipe
            </Typography>
            <AddRecipeForm />
         </Paper>
      </Container>
   );
};

export default CreateRecipe;
