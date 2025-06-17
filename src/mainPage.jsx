import React from "react";
import { Box, Flex, Text, Button , Stack,Input, Dialog, Portal, Field, CloseButton, Table, Select, Tabs} from "@chakra-ui/react";
import taskStore from "./taskStore";
import { useState } from "react";


import { FaPencilAlt } from "react-icons/fa";
import { MdAdd, MdDelete} from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { IoChatbubbleOutline, IoBookmarksOutline } from "react-icons/io5";
import { CiMail, CiSettings } from "react-icons/ci";
import { PiMedalThin } from "react-icons/pi";





const MainPage = ()=>{

    const tasks = taskStore((state)=> state.tasks)
    const addTasks = taskStore((state)=> state.addTask);
    const toggleTaskStatus = taskStore((state)=> state.toggleTaskStatus);
    const removeTask = taskStore((state)=> state.removeTask);

    const [taskName, setTaskName] = useState('');
    const[deadline, setDeadline] = useState('');
    const[assignee, setAssignee] = useState('');
    const[open, setOpen] = useState(false);
    const[selectedTask, setSelectedTask] = useState(null);
    const[comment, setComment] = useState('');

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
                assignee,
                status: 'Pending'
            });
            setTaskName('');
            setDeadline('');
            setAssignee('');
            setOpen(false);
        }catch(error){
               console.error("error adding tasks", error);
        }
        
    }

    const handleRemoveTask = (taskId, taskName) => {
        const confirmed = window.confirm(`Are you sure you want to delete "${taskName}"?`);
        if (confirmed) {
            removeTask(taskId);
        }
    }

    const handleTaskClick = (task) => {

      if(selectedTask?.id === task.id){
        setSelectedTask(null);
      }else{
        setSelectedTask(task);
      }
        setComment(''); 
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            console.log('Comment for task:', selectedTask.id, 'Comment:', comment);
            alert(`Comment added: ${comment}`);
            setComment('');
        }
    }


    const statusColor = (status)=> {
      const normalStatusClolor = Array.isArray(status) ? status[0] : status;
      switch(normalStatusClolor){
        case 'Complete':
          return 'green';
          case 'Pending':
            return 'red';
          
            default:
              console.log('using default color' , status)
              return 'white';
      }
    }


    return(
       <Box bg={'white'} w={'1100px'} h={'630px'} borderRadius={15} overflow={'hidden'}>

        {/* SIDE NAVBAR */}

        <Box bg={'purple'} w={'60px'} h={'630px'}  float={'left'}>
          <Text fontWeight={'bold'} fontSize={20} color={'white'} pt={5} textAlign={'center'}>TS</Text>
          <Stack gap={10} alignSelf={'center'} p={4} mt={14}>
          <FaRegCalendarCheck size={22}  />
          <GoClock size={22} />
          <IoChatbubbleOutline size={22} />
          <CiMail size={22} />
          <PiMedalThin size={22} />
          <CiSettings size={24}/>
          <IoBookmarksOutline size={22} />

          </Stack>
        </Box>

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

      {/* TASK INPUT DISPLAY */}

   <Box h={'450px'} pl={3} pb={20} overflowY={'auto'} css={{
     '&::-webkit-scrollbar': { display: 'none' },
     '-ms-overflow-style': 'none',
     'scrollbar-width': 'none'
   }}>

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
  <Table.Row 
    key={task.id} 
    bg={selectedTask?.id === task.id ? 'wheat' : 'white'}
    _hover={{ bg: selectedTask?.id === task.id ? 'wheat' : 'gray.50' }}
    cursor={'pointer'}
    onClick={() => handleTaskClick(task)}

  >
    <Table.Cell color={'black'}>{task.name}</Table.Cell>
    <Table.Cell color={'black'}>{task.deadline}</Table.Cell>

<Table.Cell onClick={(e) => e.stopPropagation()}>
  <Select.Root color={'black'} value={task.status}
   onValueChange={(details)=> toggleTaskStatus(task.id, details.value)}
   >

<Select.Control>
<Select.Trigger w={100} bg={statusColor(task.status)}
borderColor={statusColor(task.status)}
>
<Select.ValueText  placeholder={task.status || 'Pending'} />
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
<Select.ItemText>Complete</Select.ItemText>
<Select.ItemIndicator />
</Select.Item>
</Select.Content>
</Select.Positioner>
</Portal>
</Select.Root>                
        
    </Table.Cell>
    <Table.Cell color={'black'} alignSelf={'end'}>{task.assignee}</Table.Cell>
    <Table.Cell onClick={(e) => e.stopPropagation()}>
      <Button 
        size="sm" 
        colorScheme="red" 
        variant="ghost"
        onClick={() => handleRemoveTask(task.id, task.name)}
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
                        <Text color={'black'}>Nothing to see here</Text>
                      </Box>
                      
                      
                      </Tabs.Content>

                  </Tabs.Root>


                   
                    </Box>
                </Box>

            </Box>
            


            


         <Box bg={'red'} w={'340px'} h={'630px'} float={'left'}>

            {selectedTask ? (
                <Box bg={'white'} p={4} h={'100%'} pt={10}>
                    <Text fontSize={18} fontWeight={'bold'} color={'black'} mb={4}>Task Details</Text>
                    
                    <Box pt={10} pl={2} mb={4} >
                      <Stack gap={5} alignItems={'start'}>
                      <Text fontWeight={'bold'} color={'black'} mb={2}>Task Name: {selectedTask.name}</Text>
                        
                        <Text fontWeight={'bold'} color={'black'} mb={2}>Deadline: {selectedTask.deadline}</Text>
                        
                        <Text fontWeight={'bold'} color={'black'} mb={2}>Status: {selectedTask.status}</Text>
                        
                        <Text fontWeight={'bold'} color={'black'} mb={2}>Assigned to: {selectedTask.assignee}</Text>                        

                      </Stack>
                    </Box>

                    <Box>
                        <Text fontWeight={'bold'} color={'black'} pl={2} mb={2} textAlign={'start'}>Add Comment:</Text>
                        <form onSubmit={handleCommentSubmit}>
                            <Input
                                placeholder="Enter your comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                mb={2}
                                bg={'gray.50'}
                            />
                            <Button 
                                type="submit" 
                                size="sm" 
                                colorScheme="blue"
                                disabled={!comment.trim()}
                            >
                                Add Comment
                            </Button>
                        </form>
                    </Box>
                </Box>
            ) : (
                <Box bg={'white'} p={4} h={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Text color={'gray.500'} textAlign={'center'}>
                        Click on a task to view details
                    </Text>
                </Box>
            )}

           </Box> 



        </Box>





        






       </Box>




    )









}



export default MainPage;