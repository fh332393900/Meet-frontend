import { useEffect, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import SettingBar from './SettingBar';

export default function Setting(props: { show: boolean, closeSetting: () => void }) {
  const  { show, closeSetting } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();
  const settingBarRef = useRef<any>();

  const close = () => {
    closeSetting();
    settingBarRef.current.closeStream();
  }
  useEffect(() => {
    if (show) {
      onOpen();
    }
  }, [onOpen, show])

  return (
    <>
      <AlertDialog
        size='2xl'
        isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        onCloseComplete={close}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Setting
            </AlertDialogHeader>
            <AlertDialogCloseButton />

            <AlertDialogBody>
              <SettingBar onRef={settingBarRef}></SettingBar>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}