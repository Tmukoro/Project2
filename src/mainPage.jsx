import React from "react";
import { Box, Flex, Text, Button , Stack,Input, Dialog, Portal, Field, CloseButton, Table, Select, Tabs} from "@chakra-ui/react";
import taskStore from "./taskStore";
import { FaPencilAlt } from "react-icons/fa";
import { MdAdd, MdDelete } from "react-icons/md";
import { useState } from "react";




const MainPage = ()=>{

    const tasks = taskStore((state)=> state.tasks)
    const addTasks = taskStore((state)=> state.addTask);
    const toggleTaskStatus = taskStore((state)=> state.toggleTaskStatus);
    const deleteTask = taskStore((state)=> state.removeTask);

    const [taskName, setTaskName] = useState('');
    const[deadline, setDeadline] = useState('');
    const[assignee, setAssignee] = useState('');
    const[open, setOpen] = useState(false);

    const submit = async (e)=>{
        e.preventDefault();
        console.log('tasks');
        try{
        if(!taskName.trim() || !deadline || !assignee.trim()){
              alert("Please fill in the task form");
              return;
        }
            addTasks({
                name: taskName,
                deadline,
                assignee
            });
            setTaskName('');
            setDeadline('');
            setAssignee('');
            setOpen(false);
        }catch(error){
               console.error("error adding tasks", error);
        }
        
    }

    const handleDeleteTask = (taskId, taskName) => {
        const confirmed = window.confirm(`Are you sure you want to delete "${taskName}"?`);
        if (confirmed) {
            deleteTask(taskId);
        }
    }


    return(
       <Box bg={'white'} w={'1100px'} h={'630px'} borderRadius={15} overflow={'hidden'}>

        {/* SIDE NAVBAR */}

        <Box bg={'purple'} w={'60px'} h={'630px'} display={'flex'} float={'left'}></Box>

        {/* TASK BOX */}
        <Box bg={'blue'} w={'1100px'} h={'630px'}>

               
            {/* TASKS */}
            <Box bg={'red'} w={'700px'} h={'630px'} float={'left'}>

                <Box bg={'white'} h={'100px'} w={'700px'}>
                    <Flex gap={2} p={4}>

                        <Text fontWeight={'bold'} fontSize={20} color={'black'} pt={0.5}>Task Schedule</Text>
                        <Button variant="plain" background={'transparent'} size={"sm"} color={'black'} ><FaPencilAlt /> Edit</Button>
                        <Button variant="plain" background={'transparent'} size={'sm'} color={'black'}>Duplicate</Button>
                        <Button variant="plain" background={'transparent'} size={'sm'} color={'black'}>Change Status</Button>
                        <Button variant="plain" background={'transparent'} size={'sm'} color={'black'}>Archive</Button>

                    </Flex>
                </Box>


                <Box bg={'gray'} w={'700px'} h={'630px'}>

                    <Box w={'700px'} h={'50px'} bg={'white'} p={1}>
                        <Flex justifyContent={'space-between'}>
                            <Text fontWeight={'bold'} color={'black'} fontSize={18} pt={3} pl={4}>Task</Text>
                            <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button variant="outline" bg={'blueviolet'} borderColor={'blueviolet'} mr={4}><MdAdd /></Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Assign a Task</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>

            <form onSubmit={submit} id="taskForm">
      <Stack gap="4" align="flex-start" maxW="sm">

        <Field.Root>
          <Field.Label>Task: </Field.Label>
          <Input value={taskName} onChange={(e)=> setTaskName(e.target.value)} />
        </Field.Root>

        <Field.Root>
          <Field.Label>Deadline: </Field.Label>
          <Input value={deadline} type="Date" onChange={(e)=> setDeadline(e.target.value)} />
        </Field.Root>        

        <Field.Root>
          <Field.Label>Assignee: </Field.Label>
          <Input value={assignee} onChange={(e)=> setAssignee(e.target.value)} />
        </Field.Root>


      </Stack>
    </form>



            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button type="submit" form="taskForm" >Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>   
                        </Flex>
                    </Box>



            {/* MAIN TASK BOX */}
      <Box bg={'white'} h={'500px'} w={'700px'}>

     <Tabs.Root defaultValue="taskList" lazyMount unmountOnExit>
      
                  <Tabs.List bg={'white'} p={1}>
                      <Tabs.Trigger value="taskList" color={'black'} _selected={{color: 'orange'}}>Tasks List</Tabs.Trigger>
                      <Tabs.Trigger value="performance" color={'black'} _selected={{color: 'orange'}}>Performance</Tabs.Trigger>
                      
                </Tabs.List>



     <Tabs.Content value="taskList">

   <Box h={'500px'} p={3}>

 <Table.Root size="sm">
<Table.Header>
<Table.Row bg={'white'}>
  <Table.ColumnHeader color={'black'}>Task Name</Table.ColumnHeader>
  <Table.ColumnHeader color={'black'}>Deadline</Table.ColumnHeader>
  <Table.ColumnHeader color={'black'}>Status</Table.ColumnHeader>
  <Table.ColumnHeader color={'black'} >Assignee</Table.ColumnHeader>
  <Table.ColumnHeader color={'black'} w={'50px'}>Action</Table.ColumnHeader>
</Table.Row>
</Table.Header>
<Table.Body>
{tasks.map((task) => (
  <Table.Row key={task.id} bg={'white'}>
    <Table.Cell color={'black'}>{task.name}</Table.Cell>
    <Table.Cell color={'black'}>{task.deadline}</Table.Cell>

<Table.Cell>
  <Select.Root color={'black'} value={task.status} onValueChange={(details)=> toggleTaskStatus(task.id, details.value)}>

<Select.Control>
<Select.Trigger w={100}>
<Select.ValueText  placeholder={task.status} />
</Select.Trigger>
</Select.Control>

<Portal>
<Select.Positioner>
<Select.Content>
<Select.Item item={'Pending'}>
<Select.ItemText>Pending</Select.ItemText>
<Select.ItemIndicator />
</Select.Item>
<Select.Item item={'Complete'}>
<Select.ItemText bg={'green'}>Complete</Select.ItemText>
<Select.ItemIndicator />
</Select.Item>
</Select.Content>
</Select.Positioner>
</Portal>
</Select.Root>                
        
    </Table.Cell>
    <Table.Cell color={'black'} alignSelf={'end'}>{task.assignee}</Table.Cell>
    <Table.Cell>
      <Button 
        size="sm" 
        colorScheme="red" 
        variant="ghost"
        onClick={() => handleDeleteTask(task.id, task.name)}
      >
        <MdDelete />
      </Button>
    </Table.Cell>
  </Table.Row>
))}
</Table.Body>
</Table.Root>


</Box>  

    </Tabs.Content>



                    <Tabs.Content value="performance">

                      <Box h={'500px'}>
                        <Text>Nothing to see here</Text>
                      </Box>
                      
                      
                      </Tabs.Content>

                  </Tabs.Root>


                   
                    </Box>
                </Box>

            </Box>
            


            


         <Box bg={'red'} w={'340px'} h={'630px'} float={'left'}>


        

           </Box> 



        </Box>





        






       </Box>




    )









}



export default MainPage;