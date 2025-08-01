'use client';
import { Camera, User, Pencil, Shield, Settings, LogOut, Trash } from "lucide-react";
import Image from 'next/image';
import styles from './UserProfile.module.css';
import { type UserProfileData } from '@/types/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AvatarUploader from '@/components/features/profile/AvatarUploader';

type UserProfileProps = {
    userData: UserProfileData;
};

export default function UserProfile({ userData }: UserProfileProps) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUploadComplete = () => {
        setIsModalOpen(false);
        router.refresh();
    };
    return (
        <div className={styles.container}>
            <div className={styles.profileGeneral}>
                <div>
                    <div className={styles.pictureContainer}>
                        <Image
                            src={userData.avatar_url || "/default-avatar.png"}
                            alt="Profile Picture"
                            width={150}
                            height={150}
                            className={styles.profilePicture}
                        />
                        <button onClick={() => setIsModalOpen(true)} className={styles.editButton}>
                            <Camera className="h-5 w-5" />
                        </button>
                    </div>
                    <div className={styles.profileDetails}>
                        <div className={styles.nameProfile}>
                            <span>{userData.first_name} {userData.last_name}</span>
                        </div>
                        <div className={styles.emailProfile}>
                            <span>{userData.email}</span>
                        </div>
                        <div className={styles.statusRole}>
                            <div className={`${styles.badge} ${styles[userData.role]}`}>
                                {/* aqui se añadirá el icono dinamico en el futuro */}
                                <User />
                                {userData.role}
                            </div>
                            <div className={`${styles.badge} ${styles[userData.status]}`}>
                                {userData.status}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.containerInfoProfile}>
                    <div className={styles.datesProfile}>
                        <div>
                            <div className={styles.itemDate}><span>Fecha de creación:</span></div>
                            <div><span>{new Date(userData.created_at).toLocaleDateString()}</span></div>
                        </div>
                        <div>
                            <div className={styles.itemLastDate}><span>Ultima conexion:</span></div> // Agregar después--------------
                            <div><span>11/11/11</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.containerProfile}>
                <div className={styles.profileInfo}>
                    <div className={styles.headerContainer}>
                        <div className={styles.header}>
                            <div className={styles.headerInfo}>
                                <div className={styles.iconContainer}>
                                    <User className={styles.iconUser} />
                                </div>
                                <div>
                                    <span>Información del perfil</span>
                                </div>
                            </div>
                            <div>
                                <button className={styles.actionButton}>
                                    <Pencil className={styles.buttonIcon} />
                                    <span>Editar información</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoItems}>
                            <div>
                                <span className={styles.userItem}>Nombre:</span>
                                <span className={styles.userData}>{userData.first_name}</span>
                            </div>
                            <div>
                                <span className={styles.userItem}>Apellido:</span>
                                <span className={styles.userData}>{userData.last_name}</span>
                            </div>
                            <div>
                                <span className={styles.userItem}>Email:</span>
                                <span className={styles.userData}>{userData.email}</span>
                            </div>
                            <div>
                                <span className={styles.userItem}>Fecha de creación:</span>
                                <span className={styles.userData}>{new Date(userData.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className={styles.actionsContainer}>
                            <div className={styles.actionSection}>
                                <div className={styles.sectionHeader}>
                                    <div className={styles.iconContainer}>
                                        <Shield className={styles.iconSecurity} />
                                    </div>
                                    <h3>SEGURIDAD</h3>
                                </div>
                                <p className={styles.sectionDescription}>
                                    Se recomienda cambiar la contraseña cada 6 meses
                                </p>
                                <button className={styles.actionButton}>
                                    <Pencil className={styles.buttonIcon} />
                                    <span>Cambiar contraseña</span>
                                </button>
                            </div>
                            <div className={styles.actionSection}>
                                <div className={styles.sectionHeader}>
                                    <div className={styles.iconContainer}>
                                        <Settings className={styles.iconSettings} />
                                    </div>
                                    <h3>ACCIONES DE CUENTA</h3>
                                </div>
                                <div className={styles.buttonGroup}>
                                    <button className={styles.actionButton}>
                                        <LogOut className={styles.buttonIcon} />
                                        <span>Cerrar sesión</span>
                                    </button>
                                    <button className={`${styles.actionButton} ${styles.dangerButton}`}>
                                        <Trash className={styles.buttonIcon} />
                                        <span>Eliminar cuenta</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className={styles.modalBackdrop}>
                    <div className={styles.modalContent}>
                        <h3>Actualizar Foto de Perfil</h3>
                        <AvatarUploader
                            uploadUrl="/api/profile/avatar"
                            onUploadComplete={handleUploadComplete}
                        />
                        <button onClick={() => setIsModalOpen(false)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}