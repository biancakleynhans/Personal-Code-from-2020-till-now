/** @format */

import React, { useState } from 'react';
import { IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonActionSheet } from '@ionic/react';
import { camera, trash, close } from 'ionicons/icons';
import { usePhotoGallery, Photo } from './usePhotoGallery';


export const PhotoTaker: React.FC = () => {
	const { deletePhoto, photos, takePhoto } = usePhotoGallery();
	const [photoToDelete, setPhotoToDelete] = useState<Photo>();

	return (
		<>
			<IonGrid>
				<IonRow>
					{photos.map((photo: any, index: any) => (
						<IonCol size='6' key={index}>
							<IonImg onClick={() => setPhotoToDelete(photo)} src={photo.base64 ?? photo.webviewPath} />
						</IonCol>
					))}
				</IonRow>
			</IonGrid>

			<IonFab vertical='bottom' horizontal='center' slot='fixed'>
				<IonFabButton onClick={() => takePhoto()}>
					<IonIcon icon={camera}></IonIcon>
				</IonFabButton>
			</IonFab>

			<IonActionSheet
				isOpen={!!photoToDelete}
				buttons={[
					{
						text: 'Delete',
						role: 'destructive',
						icon: trash,
						handler: () => {
							if (photoToDelete) {
								deletePhoto(photoToDelete);
								setPhotoToDelete(undefined);
							}
						}
					},
					{
						text: 'Cancel',
						icon: close,
						role: 'cancel'
					}
				]}
				onDidDismiss={() => setPhotoToDelete(undefined)}
			/>
		</>
	);
};
