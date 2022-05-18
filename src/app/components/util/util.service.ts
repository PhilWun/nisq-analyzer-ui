import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  timeOut = 3000;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {}

  public callSnackBar(text: string): void {
    this.snackBar.open(text, 'OK', {
      duration: this.timeOut,
    });
  }

  public callSnackBarSequence(messages: string[]): void {
    messages.forEach((message, index) => {
      setTimeout(() => {
        this.snackBar.open(message, 'OK', {
          duration: this.timeOut,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      }, index * (this.timeOut + 500)); // 500 => timeout between two messages
    });
  }

  public createDialog(
    dialogComponent: any,
    data: any,
    width?: any,
    height?: any
  ): MatDialogRef<any> {
    return this.dialog.open(dialogComponent, {
      width: width || '400px',
      height: height || undefined,
      data,
    });
  }

  /**
   * This method returns the final snackbar message after the deletion of elements.
   *
   * @param successfulDeletions
   * @param expectedDeletions
   * @param objectType
   * @param performedOperation
   * @return deletionMessage
   */
  public generateFinishingSnackbarMessage(
    successfulDeletions: number,
    expectedDeletions: number,
    objectType: string,
    performedOperation?: string
  ): string {
    performedOperation = performedOperation ? performedOperation : 'deleted';
    return (
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      'Successfully ' +
      performedOperation +
      ' ' +
      successfulDeletions +
      '/' +
      expectedDeletions +
      ' ' +
      objectType +
      '.'
    );
  }
}