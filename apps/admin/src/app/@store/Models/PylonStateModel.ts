import { PylonSession } from '@play.app/types/Pylon/PylonSession';
import { PylonContact } from '@play.app/types/Pylon/PylonContact';
import { PylonItem } from '@play.app/types/Pylon/PylonItem';

export interface PylonStateModel {
  pylonSessions: PylonSession[] | null;
  pylonVersion: string | null;
  pylonSerial: string | null;
  pylonApplicationName: string | null;
  pylonContacts: PylonContact[] | null;
  pylonItems: PylonItem[] | null;
  pylonItemsCount: number | null;
  pylonContactsCount: number | null;
  pylonDocEntriesCount: number | null;
}
