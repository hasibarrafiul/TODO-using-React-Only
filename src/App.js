import { useEffect, useState } from 'react';
import './App.css';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function App() {
  const [input, setInput] = useState('')
  const [pk, setPk] = useState(0)
  const [todo, setTodo] = useState([])
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() =>{
    if(JSON.parse(localStorage.getItem('todo'))!==null){
      let todoJson = JSON.parse(localStorage.getItem('todo'))
      setTodo(todoJson)
      let max = 0
      todoJson.map(item => {
        if(item.id > max){
          max = item.id
        }
      })
      setPk(max+1)
    }
  },[]);

  const inputAddToTodo = () =>{
      setTodo([...todo, {id: pk, todos: input}])
      setPk(pk+1)
      
  }

  const removeFromTodo = (id) =>{
    setTodo(val =>
      val.filter(e => {
        return e.id !== id;
      }),
    );
  }
  
  const save = () => {
    var data = JSON.stringify(todo);
    localStorage.setItem('todo', data);
    handleClickOpen()
  }

  return (
    <Grid
  container
  textAlign="center"
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '100vh' }}
>
      <nav aria-label="main mailbox folders">
      <h1 align='center' >TODO</h1>
      <TextField id="outlined-basic" label="Enter TODO Item" variant="outlined" type="text"  onChange={(e) => {setInput(e.target.value)}}/>
      <br></br><br></br>
      <Button variant="contained" endIcon={<SendIcon />} onClick={()=>inputAddToTodo()}>Submit</Button>
      <h1 align='center'>Tasks</h1>
      {todo.map((val) => {
        return <div>
        <List>
        <ListItem disablePadding>
          <ListItemButton>
          <ListItemText><h4>{val.todos} &nbsp;&nbsp;&nbsp;&nbsp;</h4> </ListItemText>
            <ListItemIcon>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>removeFromTodo(val.id) } >Remove</Button>
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <Divider/>
      </List>
        </div>
      })}
      <Button variant="contained" endIcon={<SaveIcon />} onClick={()=> save()}>Save</Button>
    </nav>

    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <h1>Saved</h1>
          </DialogContentText>
        </DialogContent>
        
      </Dialog>
    </Grid>
  );
}

export default App;
